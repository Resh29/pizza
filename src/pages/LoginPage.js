import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../api/auth';
import { Loader } from '../components/Loader';

export const LoginPage = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [passOpenState, setPassOpenState] = useState(false);
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submitHandler = async () => {
    setLoading(true);
    try {
      await auth('login', user);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const formValidate = (e) => {
    e.target.classList.add('touched');
  };

  useEffect(() => {
    return () => setUser({});
  }, []);

  return (
    <section className="login-page" style={{ paddingTop: '10%', minHeight: '100vh' }}>
      <div className="container">
        <h1 style={{ color: '#fff', textAlign: 'center' }}> Sign in, or register </h1>
        <div className="login-page__form-container">
          {' '}
          <div className="row">
            {loading ? (
              <Loader />
            ) : (
              <form
                className="form row"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitHandler();
                }}
              >
                <div className="form__input-field col">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="validate-input"
                    onBlur={formValidate}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    onChange={changeHandler}
                    value={user.email || ''}
                    required
                  />

                  <label htmlFor="Email"> Email </label>
                  <p className="form__error-message"></p>
                </div>
                <div className="form__input-field col">
                  <input
                    type={passOpenState ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className="validate-input"
                    onBlur={formValidate}
                    minLength="6"
                    maxLength="16"
                    onChange={changeHandler}
                    value={user.password || ''}
                    required
                  />

                  <label htmlFor="password"> Password </label>
                  <input
                    type="checkbox"
                    className="password-open-check"
                    id="password-check"
                    onChange={() => setPassOpenState((v) => !v)}
                  />
                  <label htmlFor="password-check">
                    {' '}
                    Show password <span></span>{' '}
                  </label>
                  <p className="form__error-message"></p>
                </div>
                <footer className="form__footer">
                  <input type="submit" className="btn btn-green" value="Submit" />
                  <a
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      history.push('/registration');
                    }}
                  >
                    {' '}
                    Registration{' '}
                  </a>
                </footer>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
