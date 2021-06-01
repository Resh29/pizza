import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../api/auth';

import { Loader } from '../components/Loader';

export const RegisrtationPage = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

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
                <p className="form__error-message"></p>
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
                <p className="form__error-message"></p>
              </div>
              <div className="form__input-field col">
                <input
                  type="password"
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
                <p className="form__error-message"></p>
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
                <p className="form__error-message"></p>
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
                <p className="form__error-message"></p>
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
