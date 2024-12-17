import React, { useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";

function LogIn({setUser, setIsAdmin}) { 

    const [inputText, setInputText] = useState("");
    const [password, setPassword] = useState("");

    const [users, setUsers] = useState();

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

    const handleUser = (event) => {
        const newValue = event.target.value;
        setInputText(newValue);
    }

    const handlePassword = (event) => {
        const newValue = event.target.value;
        setPassword(newValue);
    }

    const handleUserLogIn = (event) => {
        // event.preventDefault();
        let exist = false;
        let correct = false;
        users.forEach(user => {
            if(inputText == user.user) {
                exist = true;
                if(password === user.password) {    
                    correct = true;

                    setUser(inputText);
                    if(user.admin === true) {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                }
            }
        });

        if(exist){
            if(!correct) {
                alert("Contraseña incorrecta");
            } else {
                console.log("Usuario logueado:", inputText);
            }
        } else {
            alert("Este usuario no existe");
        }
    }

  return (
    <div className="LogIn">
      <h1>Bienvenido, inicia sesión con su usuario y contraseña</h1>
      <input type="text" value={inputText} onChange={handleUser}></input>
      <input type="password" value={password} onChange={handlePassword}></input>
      <button onClick={handleUserLogIn}>Iniciar sesión</button>
    </div>
  );
}

export default LogIn;
