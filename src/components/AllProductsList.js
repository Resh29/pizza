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
      splitArrayByCategory(result);
    }
    get();
  }, []);

  function normalize(arr) {
    return arr
      .reduce((acc, cur) => {
        return acc.concat(cur);
      }, [])
      .reduce((acc, cur) => {
        return acc.concat(Object.values(cur));
      }, []);
  }

  const splitArrayByCategory = (arr) => {
    const currentArr = normalize(arr);
    const keys = [...new Set([...currentArr].map((key) => key.category))];
    const result = keys.map((key) => {
      return currentArr.filter((el) => el.category === key);
    });

    setProducts(result);
  };

  const productRemove = (product) => {
    remove(`products/${product._id}`);
    setProducts((v) => v.filter((el) => el._id !== product._id));
  };
  return (
    <div className="products-list">
      <div className="container">
        <div className="row">
          {products?.length ? (
            products.map((arr, i) => {
              return (
                <div className="col-lg-2">
                  <ul className="list" key={i}>
                    <h4>{arr[0].category}</h4>
                    {arr.map((product) => {
                      return (
                        <li className="list-item" key={product._id}>
                          {' '}
                          {product.name} <br />
                          Article: {product._id}
                          <button
                            className="btn btn-red"
                            onClick={() => productRemove(product)}
                          >
                            {' '}
                            remove{' '}
                          </button>{' '}
                          <button
                            className="btn btn-green"
                            onClick={() => alert('coming soon...')}
                          >
                            {' '}
                            edit{' '}
                          </button>{' '}
                          <hr />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })
          ) : (
            <p> Netu nihuya </p>
          )}
        </div>
      </div>
    </div>
  );
};
