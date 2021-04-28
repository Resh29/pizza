import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../api/auth';
import { Form } from '../components/Form';

export const RegisrtationPage = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const auth = useAuth();

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const Footer = () => {
    return (
      <footer className="form__footer">
        <input type="submit" value="submit" className="btn btn-green" />
        <a
          className="btn btn-red"
          onClick={(e) => {
            e.preventDefault();
            history.goBack();
          }}
        >
          {' '}
          back{' '}
        </a>
      </footer>
    );
  };
  const initialState = {
    inputs: [
      { type: 'text', name: 'name', id: 'name', label: 'name', required: true },
      {
        type: 'text',
        name: 'last-name',
        id: 'last-name',
        label: 'last-name',
        required: true,
      },
      { type: 'email', name: 'email', id: 'email', label: 'email', required: true },
      {
        type: 'password',
        name: 'password',
        id: 'password',
        label: 'password',
        required: true,
      },
      { type: 'tel', name: 'phone', id: 'phone', label: 'phone', required: true },
      { type: 'text', name: 'address', id: 'address', label: 'address', required: true },
    ],
    footer: Footer,
    actions: {
      async submitHandler() {
        await auth('registration', user);
      },
      changeHandler,
    },
  };

  return (
    <section className="regisrtation-page" style={{ padding: '5rem' }}>
      <div className="container">
        <div className="row">
          <Form initialState={initialState} />
        </div>
      </div>
    </section>
  );
};
