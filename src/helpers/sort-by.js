function sortBy() {
  const cases = {
    'low-to-high': (arr, params) => {
      return arr.sort((a, b) => +a[params] - +b[params]);
    },
    'high-to-low': (arr, params) => {
      return arr.sort((a, b) => {
        return +b[params] - +a[params];
      });
    },
  };

  return (arr, params = 'views', inCase = 'high-to-low') => {
    const res = cases[inCase](arr, params);

    return res;
  };
}

export { sortBy };
