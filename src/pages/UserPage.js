import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const UserPage = () => {
  const [user] = useContext(AuthContext);
  return (
    <section
      className="user-page"
      style={{ padding: '5rem', color: '#fff', minHeight: '100vh' }}
    >
      {user ? (
        <h1 style={{ color: '#fff' }}> Hi, {user.name} </h1>
      ) : (
        <p> Login or sign up! </p>
      )}
    </section>
  );
};
