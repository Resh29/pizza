import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { CartContext } from '../context/CartContext';
import { useMessage } from '../helpers/message';

export const ProductsCart = () => {
  const [cartList, addToCart, remove, decrement] = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const history = useHistory();
  const message = useMessage();

  const getTotalSum = (arr) => {
    const result = arr.reduce((acc, cur) => {
      return (acc += cur.price * cur.count);
    }, 0);
    return result.toFixed(2);
  };
  useEffect(() => {
    setTotal(getTotalSum(cartList));
  }, [cartList]);

  const clearCart = () => {
    remove('', true);
    message({ text: 'The cart has been cleared!', type: 'info' });
  };

  return (
    <>
      <section className="products-cart" style={{ height: '100vh', padding: '2rem' }}>
        <div className="container">
          <div className="products-cart__content">
            {cartList.length ? (
              <>
                <table className="products-cart__table">
                  <caption> products cart</caption>
                  <thead>
                    <tr>
                      <th scope="col">type</th>
                      <th scope="col">product</th>
                      <th scope="col">product price</th>
                      <th scope="col"> add or delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartList.length
                      ? cartList.map((product) => {
                          return (
                            <tr key={product._id}>
                              <td data-label="type">
                                {' '}
                                <img
                                  style={{ height: '30px' }}
                                  src={product.image}
                                  alt="product.name"
                                />{' '}
                              </td>
                              <td data-label="product" valign="baseline">
                                {' '}
                                {product.name}{' '}
                              </td>
                              <td data-label="price"> {product.price} </td>
                              <td data-label="controls">
                                <button
                                  className="btn"
                                  disabled={product.count <= 1}
                                  onClick={() => decrement(product)}
                                >
                                  {' '}
                                  -{' '}
                                </button>
                                {product.count}
                                <button
                                  className="btn"
                                  onClick={() => addToCart(product)}
                                >
                                  &#43;
                                </button>
                                <button
                                  className="btn products-cart__remove"
                                  onClick={() => remove(product._id)}
                                >
                                  &#215;
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
                <div className="products-cart__order">
                  <h2 style={{ textAlign: 'center', color: '#bbb' }}>
                    {' '}
                    Total price:{' '}
                    <span style={{ color: 'firebrick' }}>{total}&nbsp;$</span>{' '}
                  </h2>
                  <div className="order-buttons">
                    <button
                      className="btn btn-green"
                      onClick={() => history.push('/order')}
                    >
                      {' '}
                      to order{' '}
                    </button>
                    <button className="btn btn-orange" onClick={() => history.goBack()}>
                      {' '}
                      continue shopping{' '}
                    </button>
                    <button className="btn btn-red" onClick={clearCart}>
                      {' '}
                      clear cart{' '}
                    </button>
                  </div>
                </div>{' '}
              </>
            ) : (
              <>
                <h4> Products cart is empty :( </h4>

                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  {' '}
                  <button className="btn btn-orange" onClick={() => history.goBack()}>
                    {' '}
                    Go back{' '}
                  </button>{' '}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
