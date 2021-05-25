import React, { useContext, useEffect, useState } from 'react';
import { getSingle } from '../api/get-single';
import { Tabs } from '../components/Tabs';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { useHistory } from 'react-router';

export const UserPage = () => {
  const [user] = useContext(AuthContext);
  const [info, setInfo] = useState(null);
  const [noUser, setNoUser] = useState(false);
  const getInfo = getSingle();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      (async () => {
        const result = await getInfo(`users/${user.uid}`);
        const history = result.history;
        const current = [
          { title: 'history', ...(history || []) },
          { title: 'user info', ...result },
        ];
        setInfo(current);
      })();
    } else {
      setTimeout(() => {
        setNoUser(true);
      }, 2000);
    }
    return () => setInfo(null);
  }, [user]);

  return (
    <section className="user-page section">
      {user ? (
        <>
          {' '}
          {info ? (
            <div className="container">
              <h1> Hi, {user.name} </h1>
              <Tabs tabs={info} />
            </div>
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <>
          {!noUser ? (
            <Loader />
          ) : (
            <div className="container">
              <h2 style={{ color: '#fff', textAlign: 'center' }}>Login or sign up!</h2>
              <div className="row" style={{ justifyContent: 'center' }}>
                <button className="btn btn-green" onClick={() => history.push('/login')}>
                  {' '}
                  Login{' '}
                </button>
                <span style={{ margin: '0 2rem' }}> or </span>
                <button
                  className="btn btn-orange"
                  onClick={() => history.push('/registration')}
                >
                  {' '}
                  registration{' '}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};
