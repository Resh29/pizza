import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export const AppHeader = () => {
  const history = useHistory();
  const [list] = useContext(CartContext);
  const [user] = useContext(AuthContext);
  const [openState, setOpenState] = useState(false);
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    return () => setOpenState(false);
  }, [location]);

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
        <button
          className={`navbar__toggler btn ${openState ? 'open' : ''}`}
          onClick={() => {
            setOpenState((v) => !v);
          }}
        >
          <div></div>
          <div></div>
          <div></div>
        </button>
        <ul className={openState ? 'navbar__nav open' : 'navbar__nav'}>
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
          {user ? (
            <li className="navbar__item">
              <NavLink to="/login" className="navbar__link">
                User: {user.name}
              </NavLink>
            </li>
          ) : null}
          <li className="navbar__item">
            {user ? (
              <a
                className="navbar__link"
                onClick={(e) => {
                  e.preventDefault();
                  auth('logout');
                }}
              >
                {' '}
                logout{' '}
              </a>
            ) : (
              <NavLink to="/login" className="navbar__link">
                Login
              </NavLink>
            )}
          </li>

          <li className="navbar__item">
            <NavLink to="/products-cart" className="navbar__link">
              Cart <span style={{ color: 'red' }}> {list.length || ''} </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
