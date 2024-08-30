import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from './path-to-your-auth-context-file';

const UserProfile = () => {
  const { user, role, logout, getUserName } = useContext(AuthContext);

  return (
    <div>
      {user ? (
        <div>
          <h3>Welcome, {user.username}!</h3>
          <p>Your role: {role}</p>
          <Button onClick={getUserName}>Get User Info</Button>
          <Button onClick={logout}>Logout</Button>
        </div>
      ) : (
        <h3>Please log in.</h3>
      )}
    </div>
  );
};

export default UserProfile;
