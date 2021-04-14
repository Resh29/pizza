import React from 'react';

export const NoMatch = () => {
  return (
    <main className="no-match" style={{ height: '100vh' }}>
      <h1 style={{ marginTop: '5rem', textAlign: 'center' }}>
        {' '}
        <span style={{ color: 'firebrick' }}> 404 </span>page not found{' '}
      </h1>
    </main>
  );
};
