import React, { useContext, useEffect } from 'react';
import { MessageContext } from '../context/MessageContext';

export const Toast = () => {
  const [messages] = useContext(MessageContext);

  return (
    <div className="toast-container">
      <ul className="toast-container__list">
        {messages.length
          ? messages.map((m) => {
              return (
                <li className={`toast-container__item ${m.type}`} key={m.id}>
                  {' '}
                  {m.text}
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};
