import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';
import { HomePage } from './pages/HomePage';
import { NoMatch } from './pages/NoMatch';
import { ProductsPage } from './pages/ProductsPage';
import { SinglePage } from './pages/SinglePage';

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/products/:slug/:id" exact>
        <SinglePage />
      </Route>
      <Route path="/a">
        <AboutPage />
      </Route>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/admin">
        <AdminPage />
      </Route>
      <Route path="/products/:slug">
        <ProductsPage />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};
