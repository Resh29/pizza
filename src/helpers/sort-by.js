function sortBy() {
  return (arr, params) => {
    let start = performance.now();
    const result = arr.reduce((acc, cur) => {
      return acc.concat(Object.values(cur));
    }, []);
    const data = result.sort((a, b) => {
      if (a[params] > b[params]) {
        return -1;
      } else if (a[params] < b[params]) {
        return 1;
      }
    });
    console.log(performance.now() - start);
    return data;
  };
}

export { sortBy };
