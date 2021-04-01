import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';
import { HomePage } from './pages/HomePage';

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/a">
        <AboutPage />
      </Route>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/admin">
        <AdminPage />
      </Route>
    </Switch>
  );
};
