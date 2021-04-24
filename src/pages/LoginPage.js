import React from 'react';
import { useHistory } from 'react-router';
import { Form } from '../components/Form';

export const LoginPage = () => {
  const history = useHistory();
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
        handler: (e) => {
          console.log(';aga');
        },
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
      submitHandler() {
        console.log('sadklsd');
      },
      changeHandler() {
        console.log('dada');
      },
    },
  };

  return (
    <section className="login-page" style={{ paddingTop: '10%', minHeight: '100vh' }}>
      <div className="container">
        <h1 style={{ color: '#fff', textAlign: 'center' }}> Sign in, or register </h1>
        <div className="login-page__form-container">
          {' '}
          <div className="row">
            <Form initialState={initialState} />
          </div>
        </div>
      </div>
    </section>
  );
};
