const solution = (num_list) => {
  const [even, odd] = num_list.reduce(
    ([even, odd], e) => {
      (e % 2 === 0 ? even : odd).push(e);
      return [even, odd];
    }, 
    [[], []]
  );

  return Number(even.join('')) + Number(odd.join(''));
};
