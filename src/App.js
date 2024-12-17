import { useState } from 'react';
import './App.css';

import DailyTrain from './components/DailyTrain';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import CreateDailyTrain from './components/CreateDailyTrain';

function App() {

  /*const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState("");

  return (
    //Usar estado isAdmin para cargar distintos componentes con un ternario
    <>
    {user && <LogOut setUser={setUser} setIsAdmin={setIsAdmin}></LogOut>}
    {!user && <LogIn setUser={setUser} setIsAdmin={setIsAdmin}></LogIn>}
      
    {user && <DailyTrain></DailyTrain>}
    {//<CreateDailyTrain></CreateDailyTrain>}
    </>
  );*/
}

export default App;
