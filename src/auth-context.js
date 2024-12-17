import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  const login = async (id, password) => {
    try {
      const response = await fetch('http://localhost:5000/users');
      const users = await response.json();

      const foundUser = users.find(
        (user) => user.id === id && user.password === password
      );

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('id', foundUser.id);
        localStorage.setItem('name', foundUser.name);
        localStorage.setItem('role', foundUser.rol);

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
