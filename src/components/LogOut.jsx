import React from 'react';
import { useAuth } from '../auth-context';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button id="logout-button" className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
