// 모의고사

/**
 * ✏️ 목표
 * - 수학 문제를 찍은 삼인 중 가장 많은 문제를 맞힌 사람을 return
 *
 * ► 예상 로직 1
 * 1. 수포자들의 찍는 패턴 저장
 * 2. 정답과 비교하기
 * 찍는 패턴의 최대 수 만큼 나머지를 구하면 비교 가능
 * 3. 가장 많이 맞힌 사람 찾기
 * Math.max를 이용하여 최대 수 찾기
 * 같은 사람이 있을 수 있으니 maxCnt와 같은 사람을 전부 정답에 push
 */

function solution(answers) {
  let answer = [];

  const a = [1, 2, 3, 4, 5]
  const b = [2, 1, 2, 3, 2, 4, 2, 5]
  const c = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
  const cntAnswer = [0,0,0]

  for(let i = 0 ; i < answers.length ; i++) {
    if(answers[i] === a[i%5]) cntAnswer[0]++;
    if(answers[i] === b[i%8]) cntAnswer[1]++;
    if(answers[i] === c[i%10]) cntAnswer[2]++;
  }

  let maxCnt = Math.max(...cntAnswer);

  for(let i = 0 ; i < cntAnswer.length ; i++) {
    if(maxCnt === cntAnswer[i]) answer.push(i+1);
  }

  return answer
}

// 1, 2, 3, 4, 5 5개
// 2, 1, 2, 3, 2, 4, 2, 5 8개
// 3, 3, 1, 1, 2, 2, 4, 4, 5, 5 10개

/**
 * 📖 풀이 과정 설명
 *
 * 1. 각 수포자들의 정답 패턴을 분석하여 저장한다
 * 1번 : `[1, 2, 3, 4, 5]` 5개
 * 2번 : `[2, 1, 2, 3, 2, 4, 2, 5]` 8개
 * 3번 : `[3, 3, 1, 1, 2, 2, 4, 4, 5, 5]` 10개
 * 2️. 정답과 비교하기
 * 각 수포자들의 패턴 갯수 만큼 나머지를 하면 패턴을 반복하면서 비교 가능하다
 * ex) answer === a[i%8] ( 0 =< i <= 정답 갯수) // 2번 수포자 경우
 * 각각을 cntAnswer에 저장하여 각 수포자들의 정답수를 배열로 저장한다.
 * 3. 최대 정답 갯수 찾기
 * `Math.max`를 이용하여 가장 많이 맞힌 정답 수를 저장한다.
 * 4. 최대 정답 수와 같은 사람들 `answer`에 `push`
 * 정답 수가 같은 사람도 있을 수 있으므로 최대 정답과 같은 사람들을 전부 push
 */