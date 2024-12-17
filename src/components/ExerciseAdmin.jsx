import React, { useState } from 'react';
import SerieAdmin from './SerieAdmin';
import { helpHttp } from '../helpers/helpHttp';
import './EditTraining.css';

function ExerciseAdmin({ exercise, training, setTraining }) {
  const [summary, setSummary] = useState(exercise.summary);

  const handleSummaryChange = (e) => {
    const newSummary = e.target.value;
    setSummary(newSummary);
    updateSummary(newSummary);
  };

  const updateSummary = async (newSummary) => {
    const updatedExercise = { ...exercise, summary: newSummary };
    await updateTrainingExercise(updatedExercise);
  };

  const addSerie = async () => {
    const newSerie = {
      id: Math.random().toString(36).substr(2, 9), // Crea un ID pseudo-único para la nueva serie
      numberOfSerie: exercise.series.length + 1,
      repetitions: 0,
      notes: "",
      done: false
    };
    const updatedExercise = {
      ...exercise,
      series: [...exercise.series, newSerie]
    };
    await updateTrainingExercise(updatedExercise);
  };

  const removeSerie = async (serieId) => {
    const updatedSeries = exercise.series.filter(serie => serie.id !== serieId);
    const updatedExercise = {
      ...exercise,
      series: updatedSeries
    };
    await updateTrainingExercise(updatedExercise);
  };

  const updateTrainingExercise = async (updatedExercise) => {
    const updatedExercises = training.exercises.map(ex => ex.id === exercise.id ? updatedExercise : ex);
    const updatedTraining = { ...training, exercises: updatedExercises };

    const result = await helpHttp().put(`http://localhost:5000/trainings/${training.id}`, {
      body: updatedTraining,
      headers: { "Content-Type": "application/json" }
    });

    if (!result.err) {
      setTraining(updatedTraining);
    } else {
      console.error('Failed to update training:', result.err);
    }
  };

  const handleRemoveExercise = async () => {
    const updatedExercises = training.exercises.filter(ex => ex.id !== exercise.id);
    const updatedTraining = { ...training, exercises: updatedExercises };

    const result = await helpHttp().put(`http://localhost:5000/trainings/${training.id}`, {
      body: updatedTraining,
      headers: { "Content-Type": "application/json" }
    });

    if (!result.err) {
      setTraining(updatedTraining);
    } else {
      console.error('Error removing exercise:', result.err);
    }
  };

  return (
    <div className="exercise-admin-container">
      <input
        type="text"
        value={summary}
        onChange={handleSummaryChange}
        placeholder="Summary of the exercise"
        className="exercise-summary-input"
      />
      {exercise.series.map((serie) => (
        <SerieAdmin
          key={serie.id}
          serie={serie}
          exercise={exercise}
          trainingId={training.id}
          updateTrainingExercise={updateTrainingExercise}
          removeSerie={removeSerie}
        />
      ))}
      <div>
        <button className="exercise-admin-button add-serie" onClick={addSerie}>
          Add Serie
        </button>
        <button className="exercise-admin-button remove-exercise" onClick={handleRemoveExercise}>
          Remove Exercise
        </button>
      </div>
    </div>
  );
}

export default ExerciseAdmin;
