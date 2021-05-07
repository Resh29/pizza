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
      {
        type: 'text',
        name: 'name',
        id: 'name',
        label: 'name',
        required: true,
        pattern: '^[a-zA-Z-А-Яа-яЁё]+$',
        error: 'The name field must contain only letters.',
      },
      {
        type: 'text',
        name: 'last-name',
        id: 'last-name',
        label: 'last-name',
        required: true,
        pattern: '^[a-zA-Z-А-Яа-яЁё]+$',
        error: 'The last name field must contain only letters.',
      },
      {
        type: 'email',
        name: 'email',
        id: 'email',
        label: 'email',
        required: true,
        pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$',
      },
      {
        type: 'password',
        name: 'password',
        id: 'password',
        label: 'password',
        required: true,
        // pattern: '(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{6,16}',
        min: 6,

        // error: `Must contain at least one  number and one uppercase and lowercase letter, and at least 6 or more characters`,
      },
      {
        type: 'tel',
        name: 'phone',
        id: 'phone',
        label: 'phone',
        required: true,
        pattern: '^[ 0-9]+$',
        min: '10',
        max: '16',
      },
      { type: 'text', name: 'address', id: 'address', label: 'address', required: false },
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
