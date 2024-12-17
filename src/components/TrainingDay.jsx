import React, { useState } from 'react';
import ExerciseAdmin from './ExerciseAdmin';
import { useLoaderData } from 'react-router-dom';
import { helpHttp } from '../helpers/helpHttp';
import './TrainingDay.css';

export async function loader({ params }) {
  try {
    const response = await helpHttp().get(`http://localhost:5000/trainings/${params.trainingId}`);
    if (!response || response.error) {
      throw new Response('Training not found', { status: 404 });
    }
    return { training: response };
  } catch (error) {
    console.error('Failed to load training data:', error);
    throw new Response('Failed to load training data', { status: 500 });
  }
}

function TrainingDay() {
  const { training } = useLoaderData();
  const [trainingState, setTrainingState] = useState(training);

  const handleAddExercise = async () => {
    const newExercise = {
      id: Math.random().toString(36).substr(2, 9),
      summary: "New Exercise",
      series: [],
      repetitions: 0,
      done: false,
      timeExercise: false,
      restingTime: 180,
      explanation: "",
      userNotes: ""
    };

    const updatedTraining = { ...trainingState, exercises: [...trainingState.exercises, newExercise] };

    const result = await helpHttp().put(`http://localhost:5000/trainings/${trainingState.id}`, {
      body: updatedTraining,
      headers: { "Content-Type": "application/json" }
    });

    if (!result.err) {
      setTrainingState(updatedTraining);
    } else {
      console.error('Error adding new exercise:', result.err);
    }
  };

  return (
    <div className="training-day-container">
  <h1 className="training-title">
    Training: {trainingState.title} - {trainingState.date}
  </h1>
  <button className="add-exercise-button" onClick={handleAddExercise}>
    + Add New Exercise
  </button>
  <div className="exercise-list">
    {trainingState.exercises.map((exercise) => (
      <ExerciseAdmin
        key={exercise.id}
        exercise={exercise}
        training={trainingState}
        setTraining={setTrainingState}
      />
    ))}
  </div>
</div>
  );
}

export default TrainingDay;
