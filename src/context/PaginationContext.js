import React, { createContext, useState } from 'react';
export const PaginationContext = createContext(null);

export const PaginationProvider = ({ children }) => {
  const [currentProducts, setProducts] = useState([]);
  const [chunk, setChunk] = useState([]);
  const [idx, setIdx] = useState(0);
  return (
    <PaginationContext.Provider
      value={[currentProducts, chunk, idx, setProducts, setChunk, setIdx]}
    >
      {' '}
      {children}{' '}
    </PaginationContext.Provider>
  );
};
