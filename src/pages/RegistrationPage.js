import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../api/auth';

import { Loader } from '../components/Loader';

export const RegisrtationPage = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [passOpenState, setPassOpenState] = useState(false);

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const formValidate = (e) => {
    e.target.classList.add('touched');
  };
  const submitHandler = async () => {
    setLoading(true);
    try {
      await auth('registration', user);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setUser({});
  }, []);

  return (
    <section className="regisrtation-page">
      <h1 className="regisrtation-page__heading heading"> Registration </h1>
      <div className="container">
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
                  type="text"
                  id="name"
                  name="name"
                  className="validate-input"
                  onBlur={formValidate}
                  pattern="^[a-zA-Z-А-Яа-яЁё]+$"
                  onChange={changeHandler}
                  value={user.name || ''}
                  required
                />

                <label htmlFor="name"> Name </label>
                <p className="form__error-message"> This field must not be empty </p>
              </div>
              <div className="form__input-field col">
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  className="validate-input"
                  onBlur={formValidate}
                  pattern="^[a-zA-Z-А-Яа-яЁё]+$"
                  onChange={changeHandler}
                  value={user['last-name'] || ''}
                  required
                />

                <label htmlFor="last-name"> Last-name </label>
                <p className="form__error-message"></p>
              </div>
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

                <label htmlFor="email"> Email </label>
                <p className="form__error-message">Incorrect email</p>
              </div>
              <div className="form__input-field col">
                <input
                  type={passOpenState ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="validate-input"
                  onBlur={formValidate}
                  pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,16}"
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
                <label htmlFor="password-check"> Show password </label>
                <p className="form__error-message">
                  {' '}
                  Password must contain uppercase, lowercase letters and numbers{' '}
                </p>
              </div>

              <div className="form__input-field col">
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="validate-input"
                  onBlur={formValidate}
                  onChange={changeHandler}
                  value={user.address || ''}
                  required
                />

                <label htmlFor="address"> Address </label>
                <p className="form__error-message">This field must not be empty</p>
              </div>
              <div className="form__input-field col">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="validate-input"
                  onBlur={formValidate}
                  placeholder="+38 (xxx)-xx-xx-xxx"
                  pattern="\+(3|7|1)(7|8|9)\d{10}"
                  onChange={changeHandler}
                  value={user.phone || ''}
                  required
                />

                <label htmlFor="phone"> Phone </label>
                <p className="form__error-message">
                  phone number must be specified in the format - +хх (xxx)-xx-xx-xxx
                </p>
              </div>
              <footer className="form__footer">
                <input type="submit" className="btn btn-green" value="Submit" />
                <a
                  style={{ textDecoration: 'none' }}
                  href="#"
                  className="btn btn-orange"
                  onClick={(e) => {
                    e.preventDefault();
                    history.goBack();
                  }}
                >
                  {' '}
                  Back{' '}
                </a>
              </footer>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
