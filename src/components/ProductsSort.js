import React, { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { sortBy } from '../helpers/sort-by';

export const ProductsSort = () => {
  const [products, setProducts] = useContext(ProductsContext);
  const sort = sortBy();

  const changeHandler = (e) => {
    setProducts([]);
    const params = e.target.value.split(' ');
    setTimeout(() => {
      setProducts(sort(products, params[0], params[1]));
    }, 100);
  };
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
