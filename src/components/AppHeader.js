import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

export const AppHeader = () => {
  const history = useHistory();
  const observable = useRef(null);
  const [viewport, setViewport] = useState(0);
  const [position, setPosition] = useState('header absolute');
  const [isListen, setIsListen] = useState(false);

  const listener = debounce(() => {
    let coords =
      Math.abs(observable.current.getBoundingClientRect().top) + window.pageYOffset;

    if (coords >= viewport) {
      setPosition('header bg-white');
    } else {
      setPosition('header');
    }
  }, 300);

  const setListener = () => {
    if (isListen) {
      return;
    } else {
      window.addEventListener('scroll', listener);
      setIsListen(true);
    }
  };

  useEffect(() => {
    const clientHeight = document.documentElement.clientHeight - 200;
    setViewport(clientHeight);
    setListener();
    // return () => window.removeEventListener('scroll', listener);
  });

  function debounce(func, ms) {
    let readyStatus = true;
    return function () {
      if (!readyStatus) {
        return;
      }
      func.apply(this, arguments);
      readyStatus = false;
      setTimeout(() => (readyStatus = true), ms);
    };
  }

  return (
    <header className={position} ref={observable}>
      <nav className="navbar">
        <a
          href="/"
          className="navbar__branding"
          onClick={(e) => {
            e.preventDefault();
            history.push('/about');
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
        </ul>
      </nav>
    </header>
  );
};
