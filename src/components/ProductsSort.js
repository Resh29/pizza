import React, { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { sortBy } from '../helpers/sort-by';

export const ProductsSort = ({ props }) => {
  const initialState = ['views', 'high-to-low'];
  const [products, setProducts] = useContext(ProductsContext);
  const [params, setParams] = useState(initialState);
  const sort = sortBy();

  const changeHandler = (e) => {
    const params = e.target.value.split(' ');
    setParams(params);
    setProducts((old) => sort([...old], params[0], params[1]));
  };

  useEffect(() => {
    setProducts(sort(props, params[0], params[1]));
  }, [props]);

  return (
    <div className="products-sort">
      {' '}
      <label htmlFor="products-sort"> Sorting by </label>
      <select
        name="products-sort"
        className="products-sort__select"
        id="products-sort"
        onChange={changeHandler}
      >
        <option value="views high-to-low"> Most popular </option>
        <option value="price low-to-high"> Price: low to high </option>

        <option value="price high-to-low"> Price: high to low </option>
      </select>
    </div>
  );
};
