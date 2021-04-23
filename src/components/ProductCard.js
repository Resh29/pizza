import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ProductCard = ({ props }) => {
  const [img, setImg] = useState(false);
  const [prop, add] = props;

  return (
    <div className="col col-l-3 col-m-2 ">
      <div className="product-card">
        <div className="product-card__header">
          <h5 className="card-heading">
            {' '}
            {prop.name} {prop.views}{' '}
          </h5>
        </div>

        <div className="product-card__body">
          <div className="product-card__overlay">
            <Link
              to={`/products/${prop.category}/${prop._id}`}
              className="d-link product-card__link"
            >
              <span>Details</span>
            </Link>
          </div>

          <img
            onLoad={() => setImg(true)}
            style={img ? { opacity: 1 } : { opacity: 0 }}
            src={prop.image}
            alt={prop.name}
            className="img"
          />
        </div>
        <div className="product-card__footer">
          <button
            className=" btn product-card__footer-text buy"
            onClick={() => add(prop)}
          >
            {' '}
            Buy now{' '}
          </button>
          <span className="product-card__footer-text">
            Price: $ {Number(prop.price).toFixed(2)}{' '}
          </span>
        </div>
      </div>
    </div>
  );
};
