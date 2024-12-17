import React, { useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { helpHttp } from '../helpers/helpHttp';
import './EditTraining.css';

export async function loader({ params }) {
  const response = await helpHttp().get(`http://localhost:5000/trainings/${params.trainingId}`);
  if (response.err) {
    throw new Response("", {
      status: 404,
      statusText: "Training Not Found",
    });
  }
  return response;
}

export default function EditTraining() {
  const training = useLoaderData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: training.date,
    title: training.title,
    description: training.description,
    type: training.type,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTraining = { ...training, ...formData };
    const result = await helpHttp().put(`http://localhost:5000/trainings/${training.id}`, {
      body: updatedTraining,
      headers: { "Content-Type": "application/json" }
    });

    if (!result.err) {
      navigate(`/contacts/${training.idUser}`);
    } else {
      console.error('Error updating training:', result.err);
    }
  };

  return (
    <div className="edit-training-container">
      <h1>Edit Training</h1>
      <form className="edit-training-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Enter training title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Enter training description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Type:</label>
          <input
            type="text"
            name="type"
            placeholder="Enter training type"
            value={formData.type}
            onChange={handleChange}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="save-button">Save</button>
          <button type="button" className="cancel-button" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
