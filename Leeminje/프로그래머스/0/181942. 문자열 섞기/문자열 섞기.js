const solution = (str1, str2) => {
  let [evenCnt, oddCnt] = [0, 0];

  return Array.from({ length: str1.length * 2 }, (_, i) => {
    return i % 2 === 0 ? str1[evenCnt++] : str2[oddCnt++];
  }).join('');
};
