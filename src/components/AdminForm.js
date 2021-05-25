import React, { useRef, useState } from 'react';
import { setFileAndData } from '../api/set-data-product';

export const AdminForm = () => {
  const setDataToStorage = setFileAndData();
  const [fileValue, setFileValue] = useState('');
  const form = useRef(null);
  const [data, setData] = useState({});
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const fileUpload = (e) => {
    const file = e.target.files[0];
    setFileValue(e.target.value);
    const fileName = file.name;
    setData({ ...data, fileName, file: file });
  };
  const resetForm = () => {
    setData({});
    setFileValue('');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const _id = Date.now();
    setDataToStorage({ ...data, _id, orders: 0 });
    resetForm();
  };
  const setIngredients = (e) => {
    let currentValue = e.target.value.split(',');
    setData({ ...data, [e.target.name]: currentValue });
  };

  function validate(e) {
    let s = e.target.value;

    setData({
      ...data,
      [e.target.name]: s.replace(/[^0-9\.]/g, ''),
    });
  }

  const formValidate = (e) => {
    e.target.classList.add('touched');
  };
  return (
    <main className="admin-page">
      <h1 style={{ textAlign: 'center' }}>Admin page</h1>
      <section className="add">
        <div className="container">
          <h2> Add product </h2>
          <div className="row">
            <form className="row add__form form" onSubmit={submitHandler} ref={form}>
              <div className="form__input-field col" style={{ textAlign: 'center' }}>
                <span className="flow-text"> Upload file </span>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="validate-input"
                  onChange={fileUpload}
                  value={fileValue}
                  required
                />

                <label htmlFor="image" className="file-upload-label"></label>
                {data.fileName ? (
                  <span className="flow-text"> {data.fileName} </span>
                ) : (
                  'Select image'
                )}
              </div>
              <div className="form__input-field col">
                <input
                  type="text"
                  name="name"
                  id="product-name"
                  required
                  className="validate-input"
                  onChange={changeHandler}
                  onBlur={formValidate}
                  value={data.name || ''}
                />
                <label htmlFor="product-name"> product name </label>
              </div>
              <div className="form__input-field col">
                <select
                  name="category"
                  id="product-category"
                  className="validate-input"
                  required
                  onChange={changeHandler}
                  onBlur={formValidate}
                  value={data.category || ''}
                >
                  <option defaultValue={''}> </option>
                  <option value="pizza"> pizza </option>
                  <option value="sushi"> sushi </option>
                  <option value="drinks"> drinks </option>
                </select>
                <label htmlFor="product-category"> category </label>
              </div>
              <div className="form__input-field col">
                <textarea
                  name="ingredients"
                  id="product-ingredients"
                  required
                  className="validate-input textarea"
                  onChange={setIngredients}
                  onBlur={formValidate}
                  value={data.ingredients || ''}
                />
                <label htmlFor="product-ingredients"> Ingredients </label>
              </div>
              {/* ingredients */}
              <div className="form__input-field col">
                <input
                  type="text"
                  name="price"
                  id="product-price"
                  required
                  className="validate-input"
                  onChange={(e) => validate(e)}
                  onBlur={formValidate}
                  value={data.price || ''}
                />
                <label htmlFor="product-price"> Price </label>
              </div>

              <div className="form__input-field col">
                <textarea
                  name="description"
                  id="product-desc"
                  required
                  className="validate-input textarea"
                  onChange={changeHandler}
                  onBlur={formValidate}
                  value={data.description || ''}
                />
                <label htmlFor="product-desc">Description </label>
              </div>
              <footer className="form__footer">
                <div>
                  <input className="btn btn-orange" type="submit" value="submit" />
                </div>
                <div>
                  <button className="btn btn-red" onClick={resetForm}>
                    {' '}
                    delete{' '}
                  </button>
                </div>
              </footer>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
