import React from 'react';

export const ProductCard = () => {
  return (
    <div className=" col-lg-3 col-md-3">
      <div className="product-card">
        <div className="product-card__overlay">
          <a
            href="#"
            className="d-link product-card__link"
            onClick={(e) => {
              e.preventDefault();
              console.log('click');
            }}
          >
            <span>Details</span>
          </a>
        </div>
        <div className="product-card__header">
          <h5 className="card-heading"> Some pizza </h5>
        </div>
        <div className="product-card__body">
          <img
            src="https://cdn.pixabay.com/photo/2017/12/05/20/10/pizza-3000285_960_720.png"
            alt="pizza"
            className="img"
          />
        </div>
        <div className="product-card__footer">
          <span className="product-card__footer-text"> Some text </span>
          <span className="product-card__footer-text">Price: $ 9.9 </span>
        </div>
      </div>
    </div>
  );
};
