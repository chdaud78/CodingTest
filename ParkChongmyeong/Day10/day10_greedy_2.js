// 큰 수 만들기

/**
 * ✏️ 목표
 * - 정해진 수에서 K만큼 수를 빼서 만들 수 있는 가장 큰 수 찾기
 *
 * ► 예상 로직 1
 * 1. `수의 크기-뺄 수`까지만큼 자를 수 있으므로 0 ~ `수의 크기-뺄 수` 중 가장 큰 값찾기
 * 2. 위 방식을 뺄 수를 줄여가며 반복
 */

function solution(number, k) {
  let answer = '';
  let canSlice = number.length - k;

  let start = 0;
  while(canSlice > 0) {
    let max = '0';
    for(let i = start ; i <= number.length - canSlice ;i++) {
      if(number[i] > max) {
        max = number[i];
        start = i+1;
        if(max === '9') break;
      }
    }
    answer += max;
    canSlice--;
  }

  return answer;
}

/**
 * 📖 풀이 과정 설명
 *
 * 1. `canSlice`는 내가 자를 수 있는 크기이다.
 * ex) '1943' 중 2개를 뺀다.면
 * ex) '19'만큼 자를 수 있다. (가장 큰 수 뒤에 수가 있어야 하므로)
 *
 * 2. `start`는 내가 찾은 max 이후로 다음 큰 수를 찾아야하므로 `let`으로 설정하여 반복하며 바꾸어준다.
 * 3. `max`를 0으로 설정하고 `start ~ number.length - canSlice`까지 반복하며 max 값을 찾는다.
 * 4. `number[i]`가 `max`보다 크면 `max = number[i]` , `start = i+1` 로 변경해준다.
 * 4-1. 만약 `max`가 9이면 최대이므로 `break`하여 필요없는 연산을 하지 않는다.
 * 5. 반복문을 나오면 `answer`에 `max`값을 넣어준다.
 * 6. 글자하나를 찾았으므로 `canSlice`를 1 줄여준다.
 */