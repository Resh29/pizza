import React, { useEffect, useRef, useState } from 'react';

export const AppHeader = () => {
  const observable = useRef(null);
  const [viewport, setViewport] = useState(0);
  const [position, setPosition] = useState('header absolute');

  const listener = debounce(() => {
    let coords =
      Math.abs(observable.current.getBoundingClientRect().top) + window.pageYOffset;

    if (coords >= viewport) {
      setPosition('header bg-white');
    } else {
      setPosition('header');
    }
  }, 300);

  useEffect(() => {
    const clientHeight = document.documentElement.clientHeight - 200;
    setViewport(clientHeight);
    window.addEventListener('scroll', listener);
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
        <a href="/" className="navbar__branding">
          {' '}
          Hi Pizza{' '}
        </a>
        <ul className="navbar__nav">
          <li className="navbar__item">
            <a href="#" className="navbar__link">
              {' '}
              Some{' '}
            </a>
          </li>
          <li className="navbar__item">
            <a href="#" className="navbar__link active">
              {' '}
              Link{' '}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
