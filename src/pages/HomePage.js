import React, { useContext, useEffect, useState } from 'react';
import { getData } from '../api/get-data';
import { Loader } from '../components/Loader';
import { ProductCard } from '../components/ProductCard';
import { ProductsSort } from '../components/ProductsSort';
import { CartContext } from '../context/CartContext';
import { ProductsContext } from '../context/ProductsContext';
import { useMessage } from '../helpers/message';
import { sortBy } from '../helpers/sort-by';

export const HomePage = () => {
  const [products, setProducts] = useContext(ProductsContext);
  const [loading, setLoading] = useState(true);
  const fetchData = getData();
  const sort = sortBy();
  const [list, addToCart] = useContext(CartContext);
  const message = useMessage();

  const addProduct = (product) => {
    addToCart(product);
    message({ text: `${product.name} added to cart!`, type: 'success' });
  };

  function normalize(arr) {
    return arr
      .reduce((acc, cur) => {
        return acc.concat(cur);
      }, [])
      .reduce((acc, cur) => {
        return acc.concat(Object.values(cur));
      }, []);
  }

  useEffect(() => {
    async function getProducts() {
      try {
        const result = await fetchData('/products');

        setProducts(sort(normalize(result)).slice(0, 6));

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getProducts();
    return () => setProducts([]);
  }, []);

  return (
    <section className="home-page">
      <div className="home-page__start-screen">
        <div className="home-page__heading">
          <h1 className="home-page__title">Pizza & Rolls</h1>
          <p className="home-page__subtitle">Best pizza, for best customers </p>
        </div>
      </div>

      <div className="home-page__pizza-list">
        <div className="divider"></div>
        <div className="home-page__content-wrapper">
          <h2 className="home-page__content-wrapper__heading ">Most popular products</h2>
          {loading ? (
            <Loader />
          ) : (
            <div className="container">
              <div className="grid">
                {products.map((el) => (
                  <ProductCard key={el._id} props={[el, addProduct]} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
