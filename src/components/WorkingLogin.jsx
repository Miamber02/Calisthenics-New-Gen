import { useState } from 'react';
import { useAuth } from '../auth-context';
import { useNavigate } from 'react-router-dom';

import './WorkingLogin.css';

const WorkingLogin = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      const success = await login(id, password);
  
      if (success) {
        const role = localStorage.getItem('role') || '';
        const name = localStorage.getItem('name') || '';
        const userId = localStorage.getItem('id') || '';

        if (role === 'admin') {
          navigate('/');
        } else if (role === 'trainer') {
          navigate('/trainer');
        } else {
          navigate('/user');
        }
        console.log(`User logged in: ${name} (ID: ${userId})`);
      } else {
        setError('Invalid credentials');
      }
    };
  
    return (
      <div className="login-container">
        <h2 className="login-title">Calisthenics New Gen</h2>
        <div className="login-form">
          <input
            type="text"
            placeholder="ID"
            value={id}
            className="login-input"
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>Login</button>
          {error && <p className="login-error">{error}</p>}
        </div>
      </div>
    );
  };
  
export default WorkingLogin;