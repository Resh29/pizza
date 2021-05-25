import React, { useContext, useEffect } from 'react';
import { MessageContext } from '../context/MessageContext';

export const useMessage = () => {
  const [messages, setMessage] = useContext(MessageContext);

  return (message = { text: 'error', type: 'error' }) => {
    const id = Date.now();
    setMessage([...messages, { ...message, id }]);
  };
};
