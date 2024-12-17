import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useFetcher } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { getContact, updateContact, getTrainings, deleteContact } from '../contacts';
import { helpHttp } from '../helpers/helpHttp';
import './contact.css'

export async function loader({ params }) {
  const contact = await getContact(params.contactId); // cambiar a id //originalmente params.contactId
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  const trainings = await getTrainings(contact.id);
  return { contact, trainings };
}

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Contact() {
  const { contact, trainings } = useLoaderData();
  const navigate = useNavigate();
  const [trainingState, setTrainingState] = useState(trainings);

  useEffect(() => {
    setTrainingState(trainings);
  }, [trainings]);

  const role = localStorage.getItem('role');

  const handleDelete = async () => {
    if (window.confirm("Please confirm you want to delete this record.")) {
      const result = await deleteContact(contact.id);
      if (result && !result.err) {
        if(role=="admin")
          navigate("/");
        if(role=="trainer")
          navigate("/trainer");

      } else {
        alert("Failed to delete the contact");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/contacts/${contact.id}/edit`);
  };

  const handleAddTraining = async () => {
    const newTraining = {
      id: Math.random().toString(36).substr(2, 9),
      idUser: contact.id,
      date: "01/01/2025",
      title: "New Training",
      description: "Description",
      type: "type",
      exercises: []
    };

    const result = await helpHttp().post(`http://localhost:5000/trainings`, {
      body: newTraining,
      headers: { "Content-Type": "application/json" }
    });

    if (!result.err) {
      setTrainingState([...trainingState, newTraining]);
    } else {
      console.error('Error adding new training:', result.err);
    }
  };

  /*const handleUpdateTraining = async (updatedTraining) => {
    const result = await helpHttp().put(`http://localhost:5000/trainings/${updatedTraining.id}`, {
      body: updatedTraining,
      headers: { "Content-Type": "application/json" }
    });

    if (!result.err) {
      setTrainingState(trainingState.map(training => 
        training.id === updatedTraining.id ? updatedTraining : training
      ));
    } else {
      console.error('Error updating training:', result.err);
    }
  };*/

  const handleRemoveTraining = async (trainingId) => {
    const result = await helpHttp().del(`http://localhost:5000/trainings/${trainingId}`);

    if (!result.err) {
      setTrainingState(trainingState.filter(training => training.id !== trainingId));
    } else {
      console.error('Error removing training:', result.err);
    }
  };

  const isTrainer = localStorage.getItem('role') === 'trainer';

  return (
    <div id="contact">
      <div>
        <h1>{contact.name}</h1>
        <h2>Trainings:</h2>
                <ul className="training-list">
          {trainingState.map(training => (
            <li key={training.id} className="training-item">
              <NavLink 
                className="training-link"
                to={isTrainer 
                  ? `/trainer/contacts/${contact.id}/trainings/${training.id}` 
                  : `/contacts/${contact.id}/trainings/${training.id}`}
              >
                {training.date} - {training.title} - {training.type}
              </NavLink>
            
              <button 
                className="delete-button" 
                onClick={() => handleRemoveTraining(training.id)}
              >
                🗑️
              </button>
            
              <button 
                className="edit-button"
                onClick={() => navigate(isTrainer 
                  ? `/trainer/contacts/${contact.id}/editTraining/${training.id}` 
                  : `/contacts/${contact.id}/editTraining/${training.id}`)}
              >
                ✏️
              </button>
            
              <button 
                className="view-button"
                onClick={() => navigate(isTrainer 
                  ? `/trainer/contacts/${contact.id}/trainingUserView/${training.id}` 
                  : `/contacts/${contact.id}/trainingUserView/${training.id}`)}
              >
                🔍👤
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleAddTraining}>Add New Training</button>
        {!isTrainer && (
        <button onClick={handleEdit}>Edit user</button>
        )}
        {!isTrainer && (
        <button onClick={handleDelete}>Delete user</button>
        )}
      </div>
    </div>
  );
}

/*function Favorite({ contact }) {
  const fetcher = useFetcher();
  let favorite = contact.favorite;

  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
*/