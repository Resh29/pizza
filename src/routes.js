import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import { AdminPage } from './pages/AdminPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NoMatch } from './pages/NoMatch';
import { ProductsCart } from './pages/ProductsCart';
import { ProductsPage } from './pages/ProductsPage';
import { RegisrtationPage } from './pages/RegistrationPage';
import { SinglePage } from './pages/SinglePage';
import { UserPage } from './pages/UserPage';
import { OrderPage } from './pages/OrderPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { ChangeInfo } from './pages/ChangeInfoPage';

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/products/:slug/:id" exact>
        <SinglePage />
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
      <Route path="/order">
        <OrderPage />
      </Route>
      <Route path="/thank-you">
        <ThankYouPage />
      </Route>
      <Route path="/user-info-change">
        <ChangeInfo />
      </Route>

      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};
