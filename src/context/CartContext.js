import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext([[], () => {}]);

export const CartContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    const items = localStorage.getItem('pizza-cart-list');
    if (items.length) {
      setCartList(JSON.parse(items));
    } else {
      return;
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('pizza-cart-list', JSON.stringify(cartList));
  }, [cartList]);

  const addToCart = (product) => {
    if (cartList.find((el) => el._id === product._id)) {
      const current = cartList.map((el) => {
        if (el._id === product._id) {
          return { ...el, count: (el.count += 1) };
        } else {
          return el;
        }
      });

      setCartList([...current]);
    } else {
      product.count = 1;
      setCartList((v) => [...v, product]);
    }
  };

  function removeFromCart(id, clear = false) {
    if (clear) {
      setCartList([]);
    } else {
      const newList = cartList.filter((el) => el._id !== id);
      setCartList(newList);
    }
  }
  function decrement(product) {
    const current = cartList.map((el) => {
      if (el._id === product._id) {
        return { ...el, count: (el.count -= 1) };
      } else {
        return el;
      }
    });
    setCartList([...current]);
  }

  return (
    <CartContext.Provider value={[cartList, addToCart, removeFromCart, decrement]}>
      {' '}
      {children}{' '}
    </CartContext.Provider>
  );
};
