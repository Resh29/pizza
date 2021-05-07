import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { AdminForm } from '../components/AdminForm';
import { AllProductsList } from '../components/AllProductsList';

export const AdminPage = () => {
  const { path, url } = useRouteMatch();

  return (
    <div className="admin-page">
      <ul>
        <li>
          <Link to={`${url}/add`}> Add product </Link>
        </li>
        <li>
          <Link to={`${url}/all`}> All products </Link>
        </li>
      </ul>
      <Switch>
        <Route path={`${path}/add`} exact>
          <AdminForm />
        </Route>
        <Route path={`${path}/all`}>
          <AllProductsList />
        </Route>
      </Switch>
    </div>
  );
};
