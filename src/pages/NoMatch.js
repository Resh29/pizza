import React from 'react';
import { useHistory } from 'react-router';

export const NoMatch = () => {
  const history = useHistory();
  return (
    <main className="no-match" style={{ height: '100vh' }}>
      <div className="container">
        <div className="no-match__content">
          <h1>
            {' '}
            <span> 404 </span>page not found{' '}
          </h1>
          <div className="no-match__sad-face"></div>
          <button className="btn btn-orange" onClick={() => history.push('/')}>
            {' '}
            home{' '}
          </button>
        </div>
      </div>
    </main>
  );
};
