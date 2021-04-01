import React, { useEffect, useState } from 'react';
import { getData } from '../api/get-data';
import { removeData } from '../api/remove-data';

export const AllProductsList = () => {
  const [products, setProducts] = useState([]);
  const fetchAll = getData();
  const remove = removeData();
  useEffect(() => {
    async function get() {
      const result = await fetchAll('/products');
      setProducts(result);
    }
    get();
  }, []);

  const productRemove = (product) => {
    remove(`products/${product._id}`);
    setProducts((v) => v.filter((el) => el._id !== product._id));
  };
  return (
    <div className="products-list">
      <ul className="list">
        {products?.length ? (
          products.map((product) => {
            return (
              <li className="list-item" key={product._id}>
                {' '}
                {product.name}{' '}
                <button className="btn btn-red" onClick={() => productRemove(product)}>
                  {' '}
                  remove{' '}
                </button>{' '}
              </li>
            );
          })
        ) : (
          <p> Netu nihuya </p>
        )}
      </ul>
    </div>
  );
};
