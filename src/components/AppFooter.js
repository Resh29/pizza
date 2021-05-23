import { NavLink } from 'react-router-dom';

export const AppFooter = () => {
  return (
    <footer className="footer">
      <div className="footer__divider"></div>
      <div className="container">
        {' '}
        <div className="footer__content">
          <ul className="footer__info">
            <li className="footer__info__item">
              {' '}
              <h4>Navigation</h4>{' '}
            </li>
            <li className="footer__info__item">
              {' '}
              <NavLink to="/"> Home </NavLink>
            </li>
            <li className="footer__info__item">
              {' '}
              <NavLink to="/products/pizza"> Pizza </NavLink>
            </li>
            <li className="footer__info__item">
              {' '}
              <NavLink to="/products/sushi"> Sushi </NavLink>
            </li>
            <li className="footer__info__item">
              {' '}
              <NavLink to="/products/drinks"> Drinks </NavLink>
            </li>
            <li className="footer__info__item">
              {' '}
              <NavLink to="/products-cart"> cart </NavLink>
            </li>
          </ul>
          <ul className="footer__info" onClick={(e) => e.preventDefault()}>
            <li className="footer__info__item">
              {' '}
              <h4>Social media</h4>{' '}
            </li>
            <li className="footer__info__item">
              {' '}
              <a href="#"> Facebook </a>{' '}
            </li>
            <li className="footer__info__item">
              <a href="#"> Instagram </a>
            </li>
            <li className="footer__info__item">
              <a href="#"> twitter </a>
            </li>
            <li className="footer__info__item">
              <a href="#"> telegram </a>
            </li>
          </ul>
          <ul className="footer__info">
            <li className="footer__info__item">
              {' '}
              <h4>Adress</h4>{' '}
            </li>
            <li className="footer__info__item"> Terlano, Bolzano </li>
            <li className="footer__info__item"> Via Nazionale 50 </li>
            <li className="footer__info__item"> tel: 0315 4369971 </li>
            <li className="footer__info__item">
              {' '}
              <span>example@gmail.com</span>{' '}
            </li>
          </ul>
        </div>{' '}
        <div className="footer__text">
          {' '}
          <p> © John Doe 1834-2021</p>
        </div>
      </div>
    </footer>
  );
};
