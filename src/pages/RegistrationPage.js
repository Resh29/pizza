import React from 'react';
import { useHistory } from 'react-router';
import { Form } from '../components/Form';

export const RegisrtationPage = () => {
  const history = useHistory();

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
      { type: 'tel', name: 'phone', id: 'phone', label: 'phone', required: true },
      { type: 'text', name: 'address', id: 'address', label: 'address', required: true },
    ],
    footer: Footer,
    actions: {
      submitHandler() {
        console.log('submit');
      },
    },
  };

  return (
    <section className="regisrtation-page">
      <div className="container">
        <div className="row">
          <Form initialState={initialState} />
        </div>
      </div>
    </section>
  );
};
