import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Form } from '../components/Form';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { useGetFormValues } from '../helpers/get-form-values';

export const OrderPage = () => {
  const [user] = useContext(AuthContext);
  const [initialState, setInitialState] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  const [cartList] = useContext(CartContext);
  const [sum, setSum] = useState('');
  const history = useHistory();
  const [state, setState, submit] = useGetFormValues(userInfo);

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

  const changeHandler = (e) => {
    setState((v) => {
      return { ...v, [e.target.name]: e.target.value };
    });
  };
  const submitHandler = () => {
    submit();
  };

  useEffect(() => {
    if (user) {
      const userInfo = {
        name: user.name,
        phone: user.phone,
        email: user.email,
        'last-name': user['last-name'],
        address: user.address,
      };

      setUserInfo(userInfo);
      setInitialState({ ...defaultState, user: userInfo });
    } else {
      setInitialState(defaultState);
    }
  }, [user]);

  useEffect(() => {
    console.log(state());
  }, [state()]);

  const defaultState = {
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
        type: 'tel',
        name: 'phone',
        id: 'phone',
        label: 'phone',
        required: true,
        pattern: '^[ 0-9]+$',
        min: '10',
        max: '16',
      },
      { type: 'text', name: 'address', id: 'address', label: 'address', required: true },
    ],
    footer: Footer,
    actions: {
      changeHandler,
      submitHandler,
    },
  };

  const getTotalSum = (arr) => {
    const result = arr.reduce((acc, cur) => {
      return (acc += cur.price * cur.count);
    }, 0);
    return result.toFixed(2);
  };

  useEffect(() => {
    setSum(getTotalSum(cartList));
  }, [cartList]);

  return (
    <section className="order-page">
      <div className="container">
        <div className="order-page__wrapper">
          <h1 className="order-page__heading"> Order </h1>
          <div className="order-page__products" style={{ backgroundColor: '#fff' }}>
            <ul className="order-page__products-list">
              <h4> Products to order:</h4>
              {cartList.map((product) => {
                return (
                  <li className="order-page__products-list__item" key={product._id}>
                    {' '}
                    Name: {product.name}{' '}
                    <span className="count"> Count: {product.count} </span>{' '}
                    <span className="price"> Price: {product.price} $ </span>{' '}
                  </li>
                );
              })}
            </ul>
            <p className="order-page__total">
              Total price: <span className="total-price">{sum} $</span>{' '}
            </p>
          </div>
          <div className="order-page__form">
            <h2 className="order-page__form-info"> Your information </h2>
            <Form initialState={initialState} />
          </div>
        </div>
      </div>
    </section>
  );
};
