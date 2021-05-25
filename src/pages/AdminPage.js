import React, { useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { AdminForm } from '../components/AdminForm';
import { AllProductsList } from '../components/AllProductsList';

export const AdminPage = () => {
  const { path, url } = useRouteMatch();
  const [activeTab, setActiveTab] = useState(1);
  const openTab = (e) => setActiveTab(+e.target.dataset.index);

  return (
    <div className="admin-page section">
      <div className="container">
        <div className="tabs">
          <div className="tabs__nav">
            <button
              className={`tabs__btn ${1 === activeTab ? 'active' : ''}`}
              data-index={1}
              onClick={openTab}
            >
              Add product
            </button>{' '}
            <button
              className={`tabs__btn ${2 === activeTab ? 'active' : ''}`}
              data-index={2}
              onClick={openTab}
            >
              Products
            </button>
          </div>

          <div className="tabs__content">
            {(activeTab === 1 && <AdminForm />) ||
              (activeTab === 2 && <AllProductsList />)}
          </div>
        </div>
      </div>
    </div>
  );
};
