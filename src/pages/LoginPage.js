import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../api/auth';
import { Form } from '../components/Form';
import { Loader } from '../components/Loader';

export const LoginPage = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const footer = () => {
    return (
      <footer className="form__footer">
        <input type="submit" value="submit" className="btn btn-green" />
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            history.push('/registration');
          }}
          className="btn"
          style={{ textDecoration: 'none', textTransform: 'capitalize', color: 'grey' }}
        >
          {' '}
          regisrtation{' '}
        </a>
      </footer>
    );
  };

  const initialState = {
    inputs: [
      {
        type: 'email',
        name: 'email',
        id: 'email',
        required: true,
        label: 'Email',
      },
      {
        type: 'password',
        name: 'password',
        id: 'password',
        required: true,
        label: 'Password',
      },
    ],
    footer,
    actions: {
      async submitHandler() {
        setLoading(true);
        await auth('login', user);
        setLoading(false);
      },
      changeHandler,
    },
  };

  return (
    <section className="login-page" style={{ paddingTop: '10%', minHeight: '100vh' }}>
      <div className="container">
        <h1 style={{ color: '#fff', textAlign: 'center' }}> Sign in, or register </h1>
        <div className="login-page__form-container">
          {' '}
          <div className="row">
            {loading ? <Loader /> : <Form initialState={initialState} />}
          </div>
        </div>
      </div>
    </section>
  );
};
