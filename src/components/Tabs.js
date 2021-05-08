import React, { useEffect, useState } from 'react';

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
              <li className="user-info__item" key={i}>
                {' '}
                <span style={{ color: 'red' }}> {entry} :</span> {t[entry]}
              </li>
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

  const opneTab = (e) => setActiveTab(+e.target.dataset.index);

  return (
    <div className="tabs">
      <div className="tabs__nav">
        {tabs.map((tab, i) => {
          return (
            <button
              className={`tabs__btn ${i === activeTab ? 'active' : ''}`}
              data-index={i}
              onClick={opneTab}
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
    </div>
  );
};
