import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { updateUserInfo } from '../api/update-user-info';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useMessage } from '../helpers/message';

export const ChangeInfo = () => {
  const [user] = useContext(AuthContext);
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const update = updateUserInfo();
  const message = useMessage();

  useEffect(() => {
    setState(user);
    setLoading(false);
    return () => setState({});
  }, [user]);
  const changeHandler = (e) => {
    setState((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };
  const inputValidate = (e) => {
    e.target.classList.add('touched');
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await update(`${user.uid}`, state);

      message({ text: 'User info change complete!', type: 'success' });
    } catch (error) {
      message({ text: error.code, type: 'error' });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="change-user-info section">
      <div className="container">
        {!loading ? (
          <form className="row form" onSubmit={submitHandler}>
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
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
};
