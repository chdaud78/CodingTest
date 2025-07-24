function solution(n, lost, reserve) {
  const realLost = lost.filter(l => !reserve.includes(l));
  const reverseLost = reserve.filter(r => !lost.includes(r));

  realLost.sort((a, b) => a - b);
  reverseLost.sort((a, b) => a - b);

  for (let i = 0; i < reverseLost.length; i++) {
    const r = notLost[i];

    const frontIdx = realLost.indexOf(r - 1);
    if (frontIdx !== -1) {
      realLost.splice(frontIdx, 1);
      continue;
    }

    const backIdx = realLost.indexOf(r + 1);
    if (backIdx !== -1) {
      realLost.splice(backIdx, 1);
    }
  }

  return n - realLost.length;
}