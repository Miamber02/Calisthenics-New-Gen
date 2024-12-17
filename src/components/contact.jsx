import React from 'react';
import { NavLink, useNavigate, useLoaderData } from 'react-router-dom';
import { helpHttp } from './helpHttp';

export default function Contact() {
  const { contact, trainings } = useLoaderData();
  const navigate = useNavigate();

  const apiURL = 'http://localhost:5000/users';

  const goToTrainings = () => {
    navigate(`/contacts/${contact.id}/trainings`);
  };

  const deleteContact = (id) => {
    return helpHttp().del(`${apiURL}/${id}`).then(response => response)
  };

  const handleDelete = async () => {
    if (window.confirm("Please confirm you want to delete this record.")) {
      const result = await deleteContact(contact.id);
      if (result && !result.err) {
        navigate("/");
      } else {
        alert("There was an error deleting the contact.");
      }
    }
  };

  const isTrainer = localStorage.getItem('role') === 'trainer';

  return (
    <div id="contact">
      <h1>{contact.name}</h1>
      <button onClick={goToTrainings} className="button">View Trainings</button>
      <div>
        <NavLink to={`/contacts/${contact.id}/edit`} className="button edit">Edit</NavLink>
        <button onClick={() => handleDelete(contact.id)} className="button delete">Delete</button>
      </div>
    </div>
  );
}
