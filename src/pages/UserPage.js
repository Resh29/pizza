import React, { useContext, useEffect, useState } from 'react';
import { getData } from '../api/get-data';
import { getSingle } from '../api/get-single';
import { Tabs } from '../components/Tabs';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';

export const UserPage = () => {
  const [user] = useContext(AuthContext);
  const [info, setInfo] = useState(null);
  const [noUser, setNoUser] = useState(false);
  const getInfo = getSingle();
  const tabs = [
    { title: 'jopa', content: 'pisyoun' },
    { title: 'pipi', content: 'kaka' },
  ];

  useEffect(() => {
    if (user) {
      (async () => {
        const result = await getInfo(`users/${user.uid}`);
        const current = [
          { title: 'history', ...(result.history || []) },
          { title: 'user info', ...result },
        ];
        setInfo(current);
      })();
    } else {
      setTimeout(() => {
        setNoUser(true);
      }, 3000);
    }
    return () => setInfo(null);
  }, [user]);

  return (
    <section
      className="user-page"
      style={{ padding: '5rem', color: '#fff', minHeight: '100vh' }}
    >
      {user ? (
        <>
          {' '}
          {info ? (
            <div className="container">
              <h1 style={{ color: '#fff' }}> Hi, {user.name} </h1>
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
            <h2 style={{ color: '#fff', textAlign: 'center' }}> Net nichego! </h2>
          )}
        </>
      )}
    </section>
  );
};
