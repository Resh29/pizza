import React from 'react';

export const Form = ({ initialState }) => {
  const initInputs = initialState?.inputs || [];
  const Footer = initialState?.footer || null;
  const actions = initialState?.actions || {
    submitHandler() {
      console.log('no handler');
    },
    changeHandler() {
      console.log('no handler');
    },
  };
  const customInputs = initialState?.customInputs || [];

  const formValidate = (e) => {
    e.target.classList.add('touched');
  };

  return (
    <form
      className="row form"
      onSubmit={(e) => {
        e.preventDefault();
        actions.submitHandler();
      }}
    >
      {initialState
        ? initInputs.map((input) => {
            return (
              <div className="form__input-field col" key={input.id}>
                <input
                  type={input.type}
                  id={input.id}
                  name={input.name}
                  className="validate-input"
                  onChange={input.handler || actions.changeHandler}
                  required={input.required}
                  onBlur={formValidate}
                />

                <label htmlFor={input.id}> {input.label} </label>
              </div>
            );
          })
        : null}
      {customInputs.length
        ? customInputs.map((Input) => {
            return <Input />;
          })
        : null}
      {Footer ? <Footer /> : null}
    </form>
  );
};
