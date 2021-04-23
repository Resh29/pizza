import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import 'normalize.css';
import firebase from 'firebase';

import reportWebVitals from './reportWebVitals';
import { firebaseConfig } from './api/firebase.config';
import { ProductsContextProvider } from './context/ProductsContext';
import { CartContextProvider } from './context/CartContext';

//firebase initialization
firebase.initializeApp(firebaseConfig);

// firebase.analytics();
ReactDOM.render(
  <React.StrictMode>
    <ProductsContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </ProductsContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
