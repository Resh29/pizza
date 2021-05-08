import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NoMatch } from './pages/NoMatch';
import { ProductsCart } from './pages/ProductsCart';
import { ProductsPage } from './pages/ProductsPage';
import { RegisrtationPage } from './pages/RegistrationPage';
import { SinglePage } from './pages/SinglePage';
import { AuthContext } from './context/AuthContext';
import { UserPage } from './pages/UserPage';

export const useRoutes = () => {
  const [user] = useContext(AuthContext);

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

      <Route path="/products/:slug">
        <ProductsPage />
      </Route>
      <Route path="/products-cart">
        <ProductsCart />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/admin">
        <AdminPage />
      </Route>
      <Route path="/registration">
        <RegisrtationPage />
      </Route>
      <Route path="/user">
        {' '}
        <UserPage />{' '}
      </Route>

      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};
