import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { getSingle } from '../api/get-single';
import { updateProduct } from '../api/update-product';
import { Loader } from '../components/Loader';

export const SinglePage = () => {
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const fetchData = getSingle();
  const history = useHistory();
  const update = updateProduct();

  let stylesClosed = {
    padding: '1rem',
    overflow: 'hidden',
    maxHeight: '250px',
  };
  let stylesOpen = {
    padding: '1rem',
    overflow: 'hidden',
    maxHeight: '500px',
  };

  useEffect(() => {
    async function getSingle() {
      const result = await fetchData(location.pathname);
      setProduct(result);

      setLoading(false);
      update(
        `${location.pathname}/views`,
        result.views ? result.views + 1 : (result.views = 1)
      );
    }
    getSingle();
  }, []);

  return (
    <section className="single">
      <div className="container">
        {!loading ? (
          <div
            className="single__product-card"
            style={{ background: '#fff', padding: '2rem', borderRadius: '5px' }}
          >
            <header className="single__header">
              <h1>
                {' '}
                {product.name} <span> {product.views} </span>{' '}
              </h1>
            </header>
            <div className="row">
              <div className="col col-l-2">
                <div className="single__image">
                  <img className="img" src={product.image} alt={product.name} />
                </div>
              </div>
              <div className="col col-l-2">
                <div className="single__desc" style={isOpen ? stylesOpen : stylesClosed}>
                  <p> {product.description} </p>
                  <ul>
                    {' '}
                    <h4>Ingridients:</h4>
                    {product.ingredients
                      ? product.ingredients.map((ingredient) => {
                          return (
                            <li
                              style={{
                                listStyle: 'inside',
                                marginLeft: '1rem',
                              }}
                            >
                              {' '}
                              {ingredient}{' '}
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </div>
                <button
                  className="btn"
                  onClick={() => setIsOpen((v) => !v)}
                  style={{ marginLeft: '3rem', marginTop: '1rem' }}
                >
                  {' '}
                  {isOpen ? 'close' : 'see more'}
                </button>
              </div>
            </div>

            <footer className="single__footer">
              <div
                className="single__price"
                style={{
                  padding: '0 1rem',
                  maxWidth: '50%',
                  marginLeft: 'auto',
                  color: 'tomato',
                  fontSize: '1.2rem',
                }}
              >
                {' '}
                Price:{' '}
                <span style={{ float: 'right', color: 'orange' }}>
                  {product.price} $
                </span>{' '}
              </div>
              <div className="single__footer-btns" style={{ marginTop: '3rem' }}>
                <button className="btn btn-red" onClick={() => history.goBack()}>
                  {' '}
                  go back{' '}
                </button>
                <button
                  className="btn btn-orange "
                  style={{ float: 'right' }}
                  onClick={() => alert('товар добавлен в корзину, которой еще нет!')}
                >
                  add to cart
                </button>
              </div>
            </footer>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
};
