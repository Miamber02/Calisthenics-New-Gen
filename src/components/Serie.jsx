import { useEffect, useState } from "react";

function Serie({ serie, checkSeriesCompletion }) {

  const [ serieCompleted, setSerieCompleted ] = useState(serie.done);

  useEffect(() => {
    checkSeriesCompletion();
  }, [serieCompleted])

  const handleDone = () => {
    serie.done = !serie.done;
    setSerieCompleted(serie.done);
    //checkSeriesCompletion();
  };

    return (
      <div className="Series">
        <div className="ExerciseSummary">
            <h6>{serie.numberOfSerie}</h6> <button onClick={handleDone}>{serieCompleted ? 'Desmarcar serie' : 'Completar serie'}</button>
            <p>Serie completada: {serieCompleted ? 'Sí' : 'No'}</p>
        </div>
      </div>
    );
  }

  
export default Serie;


