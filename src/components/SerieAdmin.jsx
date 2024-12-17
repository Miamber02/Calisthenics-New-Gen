import React, { useState } from 'react';

function SerieAdmin({ serie, exercise, updateTrainingExercise, removeSerie }) {
  const [repetitions, setRepetitions] = useState(serie.repetitions);
  const [notes, setNotes] = useState(serie.notes);

  const handleRepetitionsChange = (e) => {
    const newRepetitions = parseInt(e.target.value);
    setRepetitions(newRepetitions);
    updateSerie({ ...serie, repetitions: newRepetitions });
  };

  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    updateSerie({ ...serie, notes: newNotes });
  };

  const updateSerie = async (updatedSerie) => {
    const updatedSeries = exercise.series.map(s =>
      s.id === serie.id ? { ...s, repetitions: updatedSerie.repetitions, notes: updatedSerie.notes } : s
    );
    const updatedExercise = {
      ...exercise,
      series: updatedSeries
    };
    await updateTrainingExercise(updatedExercise);
  };

  return (
    <div className="serie-admin-container">
      <label>Serie {serie.numberOfSerie}</label>
      <input
        type="number"
        value={repetitions}
        onChange={handleRepetitionsChange}
        placeholder="Repetitions"
        className="serie-input"
      />
      <input
        type="text"
        value={notes}
        onChange={handleNotesChange}
        placeholder="Notes"
        className="serie-input"
      />
      <div className="serie-button-container">
        <button className="remove-serie-button" onClick={() => removeSerie(serie.id)}>
          Remove Serie
        </button>
      </div>
    </div>
  );
}

export default SerieAdmin;
