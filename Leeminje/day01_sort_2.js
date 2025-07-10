function solution(numbers) {
  const answer = numbers
    .map(String)
    .sort((a, b) => (b + a).localeCompare(a + b))
    .join('');

  return answer[0] === '0' ? '0' : answer;
}
