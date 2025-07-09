const solution = (my_string, indices) => {
  let cnt = 0;

  return [...my_string]
    .reduce((acc, cur, i) => {
      if (indices.includes(i)) {
        cnt++;
        return [...acc, ''];
      }
      return [...acc, cur];
    }, [])
    .join('');
};
