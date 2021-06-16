import React, { useContext, useEffect, useState } from 'react';
import { PaginationContext } from '../context/PaginationContext';
import { ProductsContext } from '../context/ProductsContext';

export const usePagination = () => {
  const [products] = useContext(ProductsContext);
  const [size, setSize] = useState(6);
  const [current, chunk, idx, setCurrent, setChunk, setIdx] =
    useContext(PaginationContext);
  useEffect(() => {
    setChunk(current[idx]);
  }, [idx]);
  const sliceChunk = (arr, size = 6) => {
    const returnArray = [];
    for (let i = 0; i < arr.length; i += size) {
      let chunk = arr.slice(i, i + size);
      returnArray.push(chunk);
    }
    return returnArray;
  };
  useEffect(() => {
    setCurrent(sliceChunk(products, size));
  }, [products]);
  useEffect(() => {
    setChunk(current[0] || []);
  }, [current]);
  return (action, size, i) => {
    if (size) {
      setSize(size);
    }
    switch (action) {
      case 'pagination/next':
        if (idx < current.length - 1) setIdx((idx) => (idx += 1));
        break;
      case 'pagination/prev':
        if (idx > 0) setIdx((idx) => (idx -= 1));
      case 'pagination/idx':
        if (i) {
          setIdx(i);
        }
      default:
        break;
    }
  };
};
