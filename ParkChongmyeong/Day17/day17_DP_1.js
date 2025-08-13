// N으로 표현

/**
 * ✏️ 목표
 * - 주어진 숫자 N을 반복 사용하여 만들고 사칙연산을 적용하여 target number 찾는 가장 작은 반복 횟수
 *
 * ► 예상 로직 (DP)
 * 1. `dp`를 이용해 N을 반복하여 `NNN, NNNN, NNNNNN...` 만들기 (set으로 중복 없애기)
 * 2. 만든 `NNNNNN` 들을 나누기
 * 3. 나눈 것들을 사칙 연산하기
 * 4. `dp`가 `number`를 가지면 그 때의 `index` 리턴하기
 */

function solution(N, number) {
  let dp = Array.from({length : 9}, () => new Set());

  for(let i = 1 ; i <= 8 ;i++) {
    let stringN = '';

    for(let j = 0 ; j < i ; j++) {
      stringN += String(N);
    }

    dp[i].add(Number(stringN));

    for(let k = 1 ; k < i ; k++) {
      for(const a of dp[k]) {
        for(const b of dp[i-k]) {
          dp[i].add(a+b);
          dp[i].add(a-b);
          dp[i].add(a*b);
          dp[i].add(Math.floor(a/b));
        }
      }
    }

    if(dp[i].has(number)) return i
  }

  return -1;
}

/**
 * 📖 풀이 과정 설명
 * 1. dp를 Set으로 최대 9개까지 만든다.
 * 2. 0 ~ i 까지 반복하며 `N`, `NN`, `NNN`, ... 만들어 dp에 저장한다.
 * 주어진 N을 `String` 형태로 변수에 더해준다.
 * `Set`이므로 `add`함수를 이용해 `Number`형태의 N으로 넣어준다.
 * 3. i를 j와 (i-j)로 나누고, dp[j]의 값 a와 dp[i-j]의 값 b로 사칙연산하여 dp[i]에 추가한다.
 * 4. 주어진 `number`가 있으면 그떄의 `index`인 i를 return 해준다.
 * 5. i가 8을 넘어도 못만들면 -1을 반환한다.
 */