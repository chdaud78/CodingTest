// 모음사전

/**
 * ✏️ 문제 개요
 * 점심시간에 도둑이 들어 체육복을 도난당한 학생들이 있음.
 * 여벌 체육복이 있는 학생이 도난당한 학생에게 체육복을 빌려주려 함.
 * 단, 앞번호나 뒷번호 학생에게만 빌려줄 수 있음.
 *
 * ✏️ 목표
 * 가능한 많은 학생이 체육 수업을 들을 수 있도록 빌려주는 전략을 세워,
 * 체육 수업을 들을 수 있는 학생 수의 최댓값을 구하라.
 *
 * ✏️ 예상 로직
 * 1. 도난과 여벌이 겹치는 학생은 본인이 입고 빌려줄 수 없음 (교집합 제거)
 * 2. 진짜로 체육복이 필요한 학생(lost)과 빌려줄 수 있는 학생(reserve)을 정리
 * 3. 여벌 학생이 앞이나 뒤에 있는 도난 학생에게 우선순위대로 체육복을 빌려줌
 */

// 기본 풀이
function solution(n, lost, reserve) {
  // 0️⃣ 교집합(자기 체육복은 도난당했지만 여벌도 있는 경우)
  const intersection = lost.filter((l) => reserve.includes(l));

  // 1️⃣ 진짜 lost, 진짜 reserve 만들기
  const realLost = lost.filter((l) => !intersection.includes(l)).sort((a, b) => a - b);
  const realReserve = reserve.filter((r) => !intersection.includes(r)).sort((a, b) => a - b);

  // 2️⃣ 여벌 가진 학생이 앞이나 뒤 학생에게 빌려줌
  for (let r of realReserve) {
    const prevIndex = realLost.indexOf(r - 1); // 앞번호 확인
    if (prevIndex !== -1) {
      realLost.splice(prevIndex, 1); // 빌려줬으면 제거
      continue;
    }

    const nextIndex = realLost.indexOf(r + 1); // 뒷번호 확인
    if (nextIndex !== -1) {
      realLost.splice(nextIndex, 1); // 빌려줬으면 제거
    }
  }

  // 3️⃣ 최종 결과: 전체 학생 - 체육복이 없는 학생 수
  return n - realLost.length;
}

/**📖 풀이과정
 *
 * 0️⃣ 교집합(자기 체육복은 도난당했지만 여벌도 있는 경우)
 * - 본인은 입을 수 있으나 남에게 빌려줄 수 없기 때문에 lost, reserve에서 제거해야 한다.
 *
 * 1️⃣ 진짜 lost, 진짜 reserve 만들기
 * - 교집합을 제외한 나머지 lost, reserve만 정렬해 사용한다.
 *
 * 2️⃣ 여벌 가진 학생이 앞이나 뒤 학생에게 빌려줌
 * - 앞번호부터 탐색하여 체육복을 빌려줄 수 있는 경우에만 제거한다.
 * - 먼저 앞번호를 확인하고 없으면 뒷번호 확인 → 탐욕적 전략
 */
