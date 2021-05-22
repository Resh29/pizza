import React, { useEffect } from 'react';

export const Form = ({ initialState }) => {
  const initInputs = initialState?.inputs || [];
  const userInfo = initialState?.user || null;
  const Footer = initialState?.footer || null;
  const { changeHandler, submitHandler } = initialState.actions;

  const customInputs = initialState?.customInputs || [];

  const formValidate = (e) => {
    e.target.classList.add('touched');
  };

  return (
    <form
      className="row form"
      onSubmit={(e) => {
        e.preventDefault();
        if (submitHandler) {
          submitHandler();
        }
        e.target.reset();
      }}
    >
      {initialState
        ? initInputs.map((input) => {
            return (
              <div className="form__input-field col" key={input.id}>
                <input
                  type={input.type || 'text'}
                  id={input.id}
                  name={input.name}
                  className="validate-input"
                  onChange={changeHandler ? changeHandler : null}
                  required={input.required}
                  onBlur={formValidate}
                  pattern={input.pattern ? input.pattern : '*'}
                  minLength={input.min}
                  maxLength={input.max}
                  autoComplete="new-password"
                  defaultValue={userInfo ? userInfo[input.name] : ''}
                />

                <label htmlFor={input.id}> {input.label} </label>
                <p className="form__error-message">
                  {' '}
                  {input.error
                    ? input.error
                    : `Incorrect value in the "${input.name}" field`}{' '}
                </p>
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
