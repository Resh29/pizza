import React, { createContext, useEffect, useState } from 'react';
export const MessageContext = createContext([[], () => {}]);

export const MessageContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (messages.length) {
        setMessages(messages.slice(1, messages.length));
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [messages]);
  return (
    <MessageContext.Provider value={[messages, setMessages]}>
      {' '}
      {children}{' '}
    </MessageContext.Provider>
  );
};
