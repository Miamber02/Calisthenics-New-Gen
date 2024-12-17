import { useState } from "react";
import Serie from "./Serie";

function Exercise({ exercise, stateData, setStateData }) {

    const [showSeries, setShowSeries] = useState(false);

    const [ exerciseCompleted, setExerciseCompleted ] = useState(exercise.done);

    const [ exerciseState, setExerciseState ] = useState(exercise);

    const handleShowSeries = () => {
      setShowSeries(!showSeries);
    }

    const handleDone = () => {
      exercise.done = !exercise.done;
      exercise.series.forEach(serie => {
        serie.done = exercise.done;
      });
      setExerciseCompleted(exercise.done);
    };

    function checkSeriesCompletion() {
      let allTrue = true;

      exercise.series.forEach(serie => {
          if (serie.done == false){
              allTrue = false;
          }
      });
  
      if (allTrue) {
        setExerciseCompleted(exercise.done = true);
      } else {
        setExerciseCompleted(exercise.done = false);
      }
  }

    const handleUserNotes = (event) => {
      //setExerciseState(event.target.value);
      const newValue = event.target.value;
      setExerciseState(prevState => ({
        ...prevState,
        userNotes: newValue
    }));
    }

    return (
      <div className="Ejercicio" >
        <div className="ExerciseSummary" onClick={handleShowSeries}>
            <h6> {exercise.series.length} series  -- {exercise.summary}</h6>
        </div>
        <button onClick={handleDone}>{exercise.done ? 'Desmarcar ejercicio' : 'Completar ejercicio'}</button>
        {showSeries &&  <div className="DesplegableEjercicio">
        {exercise.explanation && (
        <p>Notas del entrenador: {exercise.explanation}</p>
        )}
        
          <p>Ejercicio completado: {exercise.done ? 'Sí' : 'No'}</p>
          {exercise.series.map((serie, index) => (
          <Serie key={index} serie={serie} checkSeriesCompletion={checkSeriesCompletion}/>
        ))}
          Notas:
          <input type="text" value={exerciseState.userNotes} onChange={handleUserNotes}></input>
        </div>}
      </div>
    );
  }

  
export default Exercise;


