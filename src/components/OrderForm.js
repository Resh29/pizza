import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

export const OrderForm = ({ initialState, formSubmit }) => {
  const [state, setState] = useState({});
  const history = useHistory();
  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const inputValidate = (e) => {
    e.target.classList.add('touched');
  };

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  return (
    <form
      className="form row"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = {
          name: state.name,
          ['last-name']: state['last-name'],
          address: state.address,
          email: state.email,
          phone: state.phone,
        };
        formSubmit(formData);
        setState({});
      }}
    >
      <div className="form__input-field col">
        <input
          className="validate-input"
          type="text"
          name="name"
          id="name"
          onChange={changeHandler}
          onBlur={inputValidate}
          value={state?.name || ''}
          pattern="^[a-zA-Z-А-Яа-яЁё]+$"
          required
        />

        <label htmlFor="name"> Name </label>
        <p className="form__error-message"></p>
      </div>
      <div className="form__input-field col">
        <input
          className="validate-input"
          type="text"
          name="last-name"
          id="last-name"
          onChange={changeHandler}
          onBlur={inputValidate}
          pattern="^[a-zA-Z-А-Яа-яЁё]+$"
          value={state?.['last-name'] || ''}
          required
        />

        <label htmlFor="last-name"> Last Name </label>
        <p className="form__error-message"></p>
      </div>
      <div className="form__input-field col">
        <input
          className="validate-input"
          type="text"
          name="address"
          id="address"
          onChange={changeHandler}
          onBlur={inputValidate}
          value={state?.address || ''}
          required
        />

        <label htmlFor="address"> Adress </label>
        <p className="form__error-message"></p>
      </div>
      <div className="form__input-field col">
        <input
          className="validate-input"
          type="tel"
          name="phone"
          id="phone"
          pattern="\+(3|7|1)(7|8|9)\d{10}"
          onChange={changeHandler}
          onBlur={inputValidate}
          value={state?.phone || ''}
          placeholder="+38 (xxx)-xx-xx-xxx"
          required
        />

        <label htmlFor="phone"> Phone number </label>
        <p className="form__error-message"></p>
      </div>
      <div className="form__input-field col">
        <input
          className="validate-input"
          type="email"
          name="email"
          id="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          onChange={changeHandler}
          onBlur={inputValidate}
          value={state?.email || ''}
          placeholder="example@gmail.com"
          required
        />

        <label htmlFor="email"> Email </label>
        <p className="form__error-message"></p>
      </div>
      <footer className="form__footer">
        <input type="submit" value="submit" className="btn btn-green" />
        <a
          href="#"
          className="btn btn-orange"
          style={{ textDecoration: 'none' }}
          onClick={(e) => {
            e.preventDefault();
            history.goBack();
          }}
        >
          {' '}
          go back{' '}
        </a>
      </footer>
    </form>
  );
};
