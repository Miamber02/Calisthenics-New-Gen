import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { helpHttp } from '../helpers/helpHttp';

function TrainingsList() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    helpHttp().get('api/trainings')
      .then(data => {
        if (!data.err) {
          setTrainings(data);
        } else {
          console.error(data);
        }
      });
  }, []);

  return (
    <div>
      <h1>Entrenamientos</h1>
      <ul>
        {trainings.map(training => (
          <li key={training.id}>
            {training.date} - {training.title}
            <Link to={`/training/${training.id}/edit`}>Editar</Link>
          </li>
        ))}
      </ul>
      <Link to="/training/new">Crear Nuevo Entrenamiento</Link>
    </div>
  );
}

export default TrainingsList;
