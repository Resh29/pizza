import { useState } from 'react';

export const useSubmitHandler = () => {
  return (params) => {
    console.log(params);
    return params;
  };
};
