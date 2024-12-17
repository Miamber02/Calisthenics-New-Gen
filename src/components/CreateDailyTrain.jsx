import React, { useEffect, useState } from "react";
import {helpHttp} from "../helpers/helpHttp"



function CreateDailyTrain() { //Inicio de json server comando 'false-api' está en package.json -> scripts

    const [users, setUsers] = useState([]);
    const [numberOfExercises, setNumberOfExercises] = useState(1);
    const [selectedUser, setSelectedUser] = useState("");

    let api = helpHttp();
    let url = "http://localhost:5000/users";

    useEffect(() => {
        api.get(url).then(res => {
          if(!res.err) {
            setUsers(res); 
          } else {
            console.log("Error al cargar usuarios");
          }
        });
      }, [])

  return (
    <div className="CreateDailyTrain">
        <h1>Create training for</h1>
        <input list="datalist-users" id="user-choice" name="user-choice" onChange={(e) => {setSelectedUser(e.target.value)}}/>
        <datalist id="datalist-users">    
            {users && users.map(user => (
                <option key={user.id} value={user.user}></option>
            ))}
        </datalist>

        <div>
            <h5>Numero de ejercicios: {numberOfExercises}</h5>
            {numberOfExercises>1 && <button onClick={() => setNumberOfExercises(numberOfExercises-1)}>-</button>}
            <button onClick={() => setNumberOfExercises(numberOfExercises+1)}>+</button>
        </div>
        
    </div>
  );
}

export default CreateDailyTrain;
