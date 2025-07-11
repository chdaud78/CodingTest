// 개선 전
/*function solution(numbers) {
    var answer = '';

    for(let i = 0 ; i < numbers.length ; i++) {
        numbers[i] = numbers[i].toString();
    }

    numbers.sort((a,b) => (b+a) - (a+b));

    answer = numbers.reduce((acc,i) => acc + i);
    return answer;
}*/
//개선 후
function solution(numbers) {
  const strs = numbers.map(String);
  strs.sort((a, b) => (b + a).localeCompare(a + b));
  if (strs[0] === '0') return '0';
  return strs.join('');
}
