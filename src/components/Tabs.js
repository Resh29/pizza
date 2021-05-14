import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { AuthState } from '../api/auth-state';
import { removeData } from '../api/remove-data';
import { AuthContext } from '../context/AuthContext';

const Tab = ({ tab }) => {
  const [cur, setCur] = useState([]);
  useEffect(() => {
    const res = Object.entries(tab)
      .map(([key, value]) => {
        if (key !== 'history' && key !== 'uid' && key !== 'title' && key !== 'isAdmin') {
          return { [key]: value };
        }
      })
      .filter((el) => !!el);
    setCur(res);
  }, [tab]);

  return (
    <div className="tab">
      <ul className="user-info">
        {cur.map((t, i) => {
          if (!t.length) {
            let entry = Object.keys(t);
            return (
              (
                <li className="user-info__item" key={i}>
                  <span> {entry} :</span> {t[entry]}
                </li>
              ) || (
                <li className="user-info__item" key={i}>
                  Empty
                </li>
              )
            );
          } else if (t.length) {
            t.map((sub) => {
              let entry = Object.keys(sub);
              return <p> {sub[entry]} </p>;
            });
          }
        })}
      </ul>
    </div>
  );
};

export const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const history = useHistory();
  const remove = removeData();
  const [user] = useContext(AuthContext);
  const auth = AuthState();

  const clearHistory = () => {
    remove(`/users/${user.uid}/history`);
    auth();
  };

  const openTab = (e) => setActiveTab(+e.target.dataset.index);

  return (
    <div className="tabs">
      <div className="tabs__nav">
        {tabs.map((tab, i) => {
          return (
            <button
              className={`tabs__btn ${i === activeTab ? 'active' : ''}`}
              data-index={i}
              onClick={openTab}
              key={i}
            >
              {' '}
              {tab.title}{' '}
            </button>
          );
        })}
      </div>
      <div className="tabs__content">
        {tabs[activeTab] && <Tab tab={tabs[activeTab]} />}
      </div>
      <div style={{ display: 'flex', margin: '1rem', justifyContent: 'space-around' }}>
        <button className="btn btn-red" onClick={clearHistory}>
          {' '}
          Delete history{' '}
        </button>
        <button
          className="btn btn-orange"
          onClick={() => {
            history.push('/user-info-change');
          }}
        >
          {' '}
          Change info{' '}
        </button>
      </div>
    </div>
  );
};
