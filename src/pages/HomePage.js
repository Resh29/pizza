import React from 'react';
import { ProductCard } from '../components/ProductCard';

export const HomePage = () => {
  return (
    <section className="home-page">
      <div className="home-page__start-screen">
        <div className="home-page__heading">
          <h1 className="home-page__title">Hi Pizza</h1>
          <p className="home-page__subtitle"> Best pizza, for best castomers </p>
        </div>
      </div>

      <div className="home-page__pizza-list">
        <div className="divider">
          <div className="container">
            <div className="arc">
              <h2 className="divider__heading"> Look below </h2>
            </div>
          </div>
        </div>
        <div className="home-page__content-wrapper">
          <div className="container">
            <div className="row">
              {[1, 2, 3, 4, 5, 6].map((el) => (
                <ProductCard key={el} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
