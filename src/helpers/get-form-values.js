import { useEffect, useState } from 'react';

export const useGetFormValues = (initialState) => {
  const [state, setState] = useState(null);
  let a = 0;
  useEffect(() => {
    setState(initialState);
  }, [initialState]);
  const f = () => {
    return state;
  };
  const submit = () => {
    a += 1;
    console.log(a);
  };

  return [f, setState, submit];
};
