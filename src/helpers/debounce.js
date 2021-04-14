import { useState } from 'react';

const useDebounce = () => {
  const [readyState, setReadyState] = useState(false);
  return function (func, ms) {
    return function () {
      if (readyState) {
        return;
      }
      func.apply(this, arguments);
      setReadyState(true);
      setTimeout(() => setReadyState(false), ms);
    };
  };
};

export { useDebounce };
