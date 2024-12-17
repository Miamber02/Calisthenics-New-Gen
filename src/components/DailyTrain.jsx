import React, { useEffect, useState } from "react";
import './DailyTrain.css';
import { trainingExample } from "./TrainingData";
import Exercise from "./Exercise";
import Timer from "./Timer";
import {helpHttp} from "../helpers/helpHttp"
// import { pruebaDatos } from "./PruebaDatos";
import { useParams } from "react-router-dom";

import { getTrain } from "../contacts";

export async function loader({ params }) {
  const trainingId = params.trainingId;
  const training = await getTrain(trainingId); 

  if (!training) {
    throw new Error("Training not found");
  }
  return { training };
}

export default function DailyTrain() { //Inicio de json server comando 'fale-api' está en package.json -> scripts

  const [stateData, setStateData] = useState(null);
  const { trainingId } = useParams();
  let api = helpHttp();
  let url = `http://localhost:5000/trainings/${trainingId}`

  useEffect(() => {
    api.get(url).then(res => {
      if (!res.err) {
        setStateData(res); 
      } else {
        console.error("Error al cargar los datos del entrenamiento:", res);
        setStateData(null);
      }
    });
  }, [url]);

  if (!stateData) {
    return <div>Loading...</div>;
  }

  /*const totalSeries = exercises.reduce((acumulador, ejercicio) => {
    return acumulador + ejercicio.series;
  }, 0);*/

  return (
    <div className="DailyTrain">
      <h1>Daily training</h1>
      <h4>{stateData.date}</h4>
      <h6>Barra porcentaje</h6>
      <div className="Ejercicios">
        {stateData.exercises.map((exercise, index) => (
          <Exercise key={index} exercise={exercise} stateData={stateData} setStateData={setStateData}/>
        ))}
      </div>
      <Timer />
    </div>
  );
}
