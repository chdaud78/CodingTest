/** ✏️ 목표
 * - 주어진 numbers에서 만들 수 있는 모든 숫자 들 중 소수 찾기
 *
 * ► 예상 로직 1
 * 1. 만들 수 있는 모든 수 만들기(재귀 함수 이용)
 * 2. 소수 검사하기
 * 3. 소수이면 answer++ 하여 소수 갯수 찾기
 */
function solution(numbers) {
  let answer = 0;
  let numberSet = new Set();

  const getPermutations = (arr, prefix = '') => {
    if (prefix.length > 0) {
      numberSet.add(Number(prefix));
    }

    for (let i = 0; i < arr.length; i++) {
      const next = [...arr];
      next.splice(i, 1);

      getPermutations(next, prefix + arr[i]);
    }
  };

  getPermutations(numbers.split(''));

  for (const num of numberSet) {
    if (isPrime(num)) answer++;
  }

  return answer;
}

const isPrime = (n) => {
  if(n < 2) return false;

  for(let i = 2 ; i < Math.floor(Math.sqrt(n)); i++) {
    if(n%i === 0) return false;
  }

  return true;
}

/**
 * 📖 풀이 과정 설명
 * https://sumin-k.medium.com/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-javascript-%EC%99%84%EC%A0%84-%ED%83%90%EC%83%89-%EC%86%8C%EC%88%98-%EC%B0%BE%EA%B8%B0-1fdcdca4f59b
 * 다음 풀이를 참고하여 풀었습니다.
 *
 * 1️⃣ 중복 없이 만들어진 모든 수를 저장한다.
 * `let numberSet = new Set();` Set을 이용하여 만들어진 모든 수를 중복없이 저장한다.
 * 2️⃣ 재귀 함수를 이용하여 가능한 모든 수를 찾아 만든다.
 * prefix : 조합 만들어진 조합이 있으면 set에 add한다.
 * numbers를 splice한 배열을 재귀하여 조합을 한다.
 * 3️⃣ 소수 검사
 * 에라토스테네스의 체를 이용하여 소수를 판별한다.
 * 소수이면 `answer++` 하여 갯수를 추가해준다.
 */