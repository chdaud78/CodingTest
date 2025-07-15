// 기능개발

/** ✏️ 목표
 * - 배포마다 몇 개씩 배포되는지! 배열로 반환하기
 * - 배열을 순회하며, 기준일보다 작거나 같으면 같은날 배포! 크면 새로운 배포 그룹 생성
 * ► 예상 로직
 * 1. 각 기능이 개발 완료까지 필요한 일수를 계산
 * 2. 순서대로 배포 가능 여부를 판단
 * 3. 한 번에 몇 개가 배포되는지를 구하기
 */

// 기존 풀이
function solution(progresses, speeds) {
  const answer = [];
  // 현재 배포 그룹의 기준일, 현재 배포 그룹일 기준일 기준 계산 날짜
  let [currentDay, count] = [0, 0];

  // 0️⃣ 왜 forEach를 두고 for를 사용했는가?
  for (let i = 0; i < progresses.length; i++) {
    // 1️⃣ 각 기능마다 필요한 날짜 계산
    const remain = 100 - progresses[i];
    const day = ~~((remain + speeds[i] - 1) / speeds[i]);
    // const day = Math.ceil(remain / speeds[i]);

    // 2️⃣ 큐처럼 순서대로 비교하며 묶기
    if (day <= currentDay) {
      count++;
    } else {
      if (count > 0) answer.push(count);
      currentDay = day;
      count = 1;
    }
  }

  // 마지막 배포 그룹 처리
  answer.push(count);
  return answer;
}

/** 📖 풀이 과정
 * 0️⃣ 왜 forEach를 두고 for를 사용했는가?
 * 1. forEach()는 내부에서 break, continue 등 호출 제어가 어려움
 * 2. 반면 for문은 조건에 따라 유연하게 로직 분리 가능
 * 3. 배포 그룹이 바뀔 때마다 answer.push()를 수행해야 하므로, 명확한 흐름 분기라 필요함...
 *
 * 1️⃣ 각 기능마다 필요한 날짜 계산
 *    - 100%까지 남은 진척도를 계산
 *    - 하루에 늘어나는 양(speeds[i]를 나눠 며칠이 걸릴지 계산)
 *    - [기존] Math.ceil(a / b) 대신, 버튼 연산 최적화 방식인 Math.floor((a + b) / b) 사용
 *       // const day = Math.ceil((100 - progress) / speeds[i]);
 *       // const day = Math.floor((100 - progress + speeds[i] - 1) / speeds[i]);
 *       // Math.ceil(a / b) == Math.floor((a + b - 1) / b);
 *    - [개선] 비트 연산자
 *
 * 2️⃣ 큐처럼 순서대로 비교하며 묶기
 *    - 현재 기준일(currentDay)보다 작거나 같으면 같은 날 배포 가능!
 *    - 기준일보다 크면 -> 새로운 배포 그룹 시작
 *    - count를 통해 해당 배포일에 몇 개의 기능이 함께 배포되는지 카운트
 */

// 개선 풀이
