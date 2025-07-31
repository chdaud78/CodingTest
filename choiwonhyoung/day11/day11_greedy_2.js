function solution(number, k) {
  let answer = '';
  let start = 0;
  let leftNums = number.length - k;

  for (let i = 0; i < leftNums; i++) {
    let maxNum = '0';

    for (let j = start; j <= k + i; j++) {
      if (number[j] > maxNum) {
        maxNum = number[j];
        start = j + 1;

        if (maxNum === '9') break;
      }
    }

    answer += maxNum;
  }

  return answer;
}
