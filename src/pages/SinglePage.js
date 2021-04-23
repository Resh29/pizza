import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { getSingle } from '../api/get-single';
import { updateProduct } from '../api/update-product';
import { Loader } from '../components/Loader';
import { CartContext } from '../context/CartContext';

export const SinglePage = () => {
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const fetchData = getSingle();
  const history = useHistory();
  const update = updateProduct();
  const [cartList, addToCart] = useContext(CartContext);

  const stylesOpen = {
    maxHeight: '1200px',
    marginBottom: '2rem',
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
          <div className="single__product-card">
            <header className="single__header">
              <h1> {product.name} </h1>
            </header>
            <div className="row">
              <div className="col col-l-2">
                <div className="single__image">
                  <img className="img" src={product.image} alt={product.name} />
                </div>
              </div>
              <div className="col col-l-2">
                <div className="single__desc" style={isOpen ? stylesOpen : {}}>
                  <h4 className="single__desc-heading">
                    {' '}
                    Description & <span>Ingredients</span>{' '}
                  </h4>
                  <p className="single__desc-text"> {product.description} </p>
                  <ul className="single__desc-ingredients-list">
                    {' '}
                    <h4 className="single__desc-heading">Ingridients:</h4>
                    {product.ingredients
                      ? product.ingredients.map((ingredient, i) => {
                          return (
                            <li className="single__desc-ingredients-list__item" key={i}>
                              {' '}
                              {ingredient}{' '}
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </div>
                <div className="single__desc-overflow">
                  <button className="btn" onClick={() => setIsOpen((v) => !v)}>
                    {' '}
                    {isOpen ? 'close' : 'see more'}
                  </button>
                </div>
              </div>
            </div>

            <footer className="single__footer">
              <p className="single__price">
                Price:
                <span>{product.price} $</span>{' '}
              </p>
              <div className="single__footer-btns" style={{ marginTop: '3rem' }}>
                <button className="btn btn-red" onClick={() => history.goBack()}>
                  {' '}
                  go back{' '}
                </button>
                <button
                  className="btn btn-orange "
                  style={{ float: 'right' }}
                  onClick={() => addToCart(product)}
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
