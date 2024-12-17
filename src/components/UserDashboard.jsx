import React from 'react';
import { useLoaderData, NavLink, Outlet } from 'react-router-dom';
import { getTrainings } from '../contacts';
import './UserDashboard.css';
//import '../routes/root.css'
import LogoutButton from './LogOut';

export async function loader() {
  const userId = localStorage.getItem('id');

  if (!userId) {
    throw new Response("User not logged in", { status: 401 });
  }

  try {
    const trainings = await getTrainings(userId);

    if (!trainings || trainings.length === 0) {
      throw new Error("No trainings found");
    }

    return { trainings };
  } catch (error) {
    console.error("Error loading trainings:", error);
    throw new Response("Error loading trainings", { status: 500 });
  }
}

export default function UserDashboard() {
  const { trainings } = useLoaderData();

  if (!trainings || trainings.length === 0) {
    return <div>No trainings available</div>;
  }

  return (
    <div id="user-dashboard">
      <div id="sidebar">
        <h2>Your Trainings</h2>
        <ul>
            <li><LogoutButton className="logout-button"/></li>
          {trainings.map((training) => (
            <li key={training.id}>
            <NavLink
              to={`/user/training/${training.id}`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              - {training.title}
            </NavLink>
          </li>
          ))}
        </ul>
      </div>

      <div id="content-area">
        <Outlet />
      </div>
    </div>
  );
}
