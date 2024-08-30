import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));

      // Fetch role name using roleId
      axios.get(`http://localhost:9999/roles?id=${user.roleId}`)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            setRole(response.data[0].name); // Assume role name is returned
          } else {
            console.warn('Role not found for user');
            setRole(null);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch role:', error);
          setRole(null);
        });
    } else {
      localStorage.removeItem('user');
      setRole(null);
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    if (user) {
      const userId = user.id; // Lấy userId trước khi xóa user
      localStorage.removeItem('user'); // Clear user information
      localStorage.removeItem(`${userId}_theme`); // Clear theme setting for the user
      localStorage.removeItem(`${userId}_backgroundImage`); // Clear background image setting for the user
  
      // Reset CSS to default values
      document.body.removeAttribute('data-theme'); // Remove theme attribute
      document.body.style.backgroundImage = ''; // Clear background image
    }
    setUser(null);
    setRole(null);
  };
  
 const getUserName = () => {
   axios.get(`http://localhost:9999/users?id=${user.id}`)
     .then((response) => {
       if (response.data && response.data.length > 0) {
         setUser(response.data[0]);
       } else {
         console.warn('User not found');
         setUser(null);
       }
     })
     .catch((error) => {
       console.error('Failed to fetch user:', error);
       setUser(null);
     });
 }
  return (
    <AuthContext.Provider value={{ user, role, login, logout, getUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
