// 모의고사

/**
 * ✏️ 문제 개요
 * 수포자 1~3번이 일정한 패턴으로 문제를 찍음.
 * 실제 정답(answers 배열)과 비교해서 누가 가장 많이 맞췄는지 판단하는 문제
 *
 * ✏️ 목표
 * - 세 사람의 찍는 패턴을 반복하며 정답과 비교
 * - 가장 많이 맞힌 사람(들)의 번호를 오름차순 배열로 반환
 *
 * ✏️ 예상 로직
 * 1. 각 수포자의 찍는 패턴을 배열로 선언
 * 2. answers를 순회하며 각 수포자의 정답 수 카운트
 * 3. 가장 많이 맞힌 수포자의 번호를 결과 배열에 저장
 *
 * ... 패턴이 순환되기 때문에 "나머지 연산 (%)" 활용해보자!
 */

// 선택한 풀이
const solution = (answers) => {
  // 0️⃣ 수포자 패턴은 배열로 고정
  const patterns = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];

  const scores = [0, 0, 0];

  answers.forEach((answer, idx) => {
    patterns.forEach((pattern, personIdx) => {
      // 1️⃣ 정답 비교 방식
      const guess = pattern[idx % pattern.length];
      if (guess === answer) scores[personIdx]++;
    });
  });

  // 2️⃣ 최댓값 추출 및 결과 반환
  const maxScore = Math.max(...scores);

  const result = [];
  scores.forEach((score, i) => {
    if (score === maxScore) result.push(i + 1);
  });

  return result;
};

/** 📖 풀이과정
 * 0️⃣ 수포자 패턴은 배열로 고정
 * - 각 인덱스 = 수포자 번호 - 1
 *
 * 1️⃣ 정답 비교 방식
 * - 정답의 길이가 패턴보다 길 수 있으므로 순환 처리 필요
 * - 나머지 연산 %로 인덱스를 반복
 *
 * 2️⃣ 최댓값 추출 및 결과 반환
 * - 동점자 처리를 위해 모든 수포자 점수를 비교
 * - 1번부터 시작하므로 i + 1 로 저장
 */

// 초기 풀이

const solution = (answers) => {
  const patterns = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];

  const scores = patterns.map((pattern) =>
    answers.reduce((acc, answer, i) => acc + (answer === p[o % p.length] ? 1 : 0), 0)
  );

  const maxScore = Math.max(...scores);

  const result = scores.map((score, idx) => (score === maxScore ? idx + 1 : null)).filter(n !== null);
  return result;
};

/**
 * map / reduce / filter는 내부적으로 함수 객체 생성,
 * 불필요한 중간 배열(scores.map → 배열 생성 → null 필터링)이 발생하기도 하고,
 * 지금은 ForEach로도 충분히 해결가능!
 */
