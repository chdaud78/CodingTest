function solution(brown, yellow) {
    const total = brown + yellow;

  for (let height = 1; height <= yellow; height++) {
    if (yellow % height !== 0) continue;

    const width = yellow / height;

    const Width = width + 2;
    const Height = height + 2;

    if (Width * Height === total) {
      return [Width, Height];
    }
  }
}