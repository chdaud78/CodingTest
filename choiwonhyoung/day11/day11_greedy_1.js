function solution(name) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let answer = 0;
  const nameLength = name.length;

  for (let i = 0; i < nameLength; i++) {
    const idx = alphabet.indexOf(name[i]);
    answer += Math.min(idx, 26 - idx);
  }

  let move = nameLength - 1;

  for (let i = 0; i < nameLength; i++) {
    let next = i + 1;
    while (next < nameLength && name[next] === 'A') {
      next++;
    }

    const turn = i + nameLength - next + Math.min(i, nameLength - next);
    move = Math.min(move, turn);
  }

  return answer + move;
}