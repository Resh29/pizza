import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

export const AppHeader = () => {
  const history = useHistory();

  return (
    <header className="header">
      <nav className="navbar">
        <a
          href="/"
          className="navbar__branding"
          onClick={(e) => {
            e.preventDefault();
            history.push('/');
          }}
        >
          {' '}
          Hi Pizza{' '}
        </a>
        <ul className="navbar__nav">
          <li className="navbar__item">
            <NavLink to="/" className="navbar__link" exact>
              {' '}
              Home{' '}
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/a" className="navbar__link" exact>
              {' '}
              About{' '}
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/products/pizza" className="navbar__link" exact>
              {' '}
              Pizza{' '}
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/products/sushi" className="navbar__link" exact>
              {' '}
              Sushi{' '}
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/products/drinks" className="navbar__link" exact>
              {' '}
              Drinks{' '}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
