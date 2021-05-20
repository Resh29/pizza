import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Form } from '../components/Form';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { Loader } from '../components/Loader';
import { setOrder } from '../api/set-order';
import { useMessage } from '../helpers/message';
import { OrderForm } from '../components/OrderForm';

export const OrderPage = () => {
  const [user] = useContext(AuthContext);

  const message = useMessage();
  const [cartList, setCartList, remove] = useContext(CartContext);
  const setOrderData = setOrder();
  const [sum, setSum] = useState('');
  const history = useHistory();

  const submitForm = async (data) => {
    try {
      const date = Date.now();
      const id = `${date + Math.floor(Math.random() * 10)}`;
      const formData = {
        date,
        id,
        ...data,
        order: cartList,
      };
      await setOrderData(formData, user);
      message({ text: 'Order is processed', type: 'success' });
      remove('', true);
      history.push('/thank-you');
    } catch (error) {
      message({ text: error.code, type: 'error' });
    }
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
        {cartList.length ? (
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
              {user ? (
                <OrderForm initialState={user} formSubmit={submitForm} />
              ) : (
                <OrderForm initialState={null} formSubmit={submitForm} />
              )}
            </div>
          </div>
        ) : (
          <div className="container">
            <h2
              className="heading"
              style={{
                textAlign: 'center',
                margin: '3rem 0',
                fontSize: '4rem',
                color: '#fff',
              }}
            >
              {' '}
              No products to order{' '}
            </h2>
            <div className="row">
              <button
                className="btn btn-orange"
                style={{ margin: '0 auto' }}
                onClick={() => history.push('/')}
              >
                home
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
