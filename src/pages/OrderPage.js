import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

import { setOrder } from '../api/set-order';
import { useMessage } from '../helpers/message';
import { OrderForm } from '../components/OrderForm';
import { Loader } from '../components/Loader';

export const OrderPage = () => {
  const [user] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const message = useMessage();
  const [cartList, setCartList, remove] = useContext(CartContext);
  const setOrderData = setOrder();
  const [sum, setSum] = useState('');
  const history = useHistory();

  const submitForm = async (data) => {
    setLoading(true);
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
      setLoading(false);
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
              <table className="table">
                <caption> products to order </caption>
                <thead>
                  <tr>
                    <th scope="col">product name</th>
                    <th scope="col">count</th>
                    <th scope="col">price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartList.map((product) => {
                    return (
                      <tr key={product._id}>
                        <td data-label="product name"> {product.name} </td>
                        <td data-label="count"> {product.count} </td>
                        <td data-label="price"> {product.price} $ </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <p className="order-page__total">
                Total price: <span className="total-price">{sum} $</span>{' '}
              </p>
            </div>
            <div className="order-page__form">
              <h2 className="order-page__form-info"> Order form </h2>
              {loading ? (
                <Loader />
              ) : user ? (
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
