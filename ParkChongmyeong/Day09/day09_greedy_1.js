// 체육복

/**
 * ✏️ 목표
 * - 체육복이 남는 사람이 체육복을 잃어버린 사람에게 줄수 있을 때 체육복을 입을 수 잇는 최대 학생수
 *
 * ► 예상 로직 1
 * 1. 여유분이 있는 사람이 체육복을 도둑 맞을 수 있으니
 * 진짜로 잃어버린 사람, 가짜로 잃어버린 사람으로 배열을 만들어야한다.
 *
 * 2. 비교를 쉽게하기 위해 정렬을 해준다.
 *
 * 3. 가지고 있는 사람 수를 `전체 - 진짜 잃어버린수`로 정해준다.
 *
 * 4. 남은 사람 중에 `index+1` 이나 `index-1`을 포함중이면 빌려준다.
 * 이때 남은 사람에서 `index+1` 이나 `index-1`을 삭제한다(splice 이용)
 * 가지고 있는 사람 수를 `+1` 더해준다.
 */

function solution(n, lost, reserve) {
  let realLost = lost.filter((x) => !reserve.includes(x))
  let realReserve = reserve.filter((x) => !lost.includes(x));

  let answer = n - realLost.length;

  realLost.sort((a,b) => a-b);
  realReserve.sort((a,b) => a-b);

  for(let i = 0 ; i < realLost.length ; i++) {
    let next = realLost[i] + 1;
    let prev = realLost[i] - 1;

    if (realReserve.includes(prev)) {
      realReserve.splice(realReserve.indexOf(prev), 1);
      answer++;
    } else if (realReserve.includes(next)) {
      realReserve.splice(realReserve.indexOf(next), 1);
      answer++;
    }
  }

  return answer;
}

/**
 * 📖 풀이 과정 설명
 *
 * 1. 진짜 잃어버린 사람과 남은 사람 찾기
 * `filter` 함수를 이용하여 `lost`내에서 `reserve`를 포함하는 값이 있으면 걸러준다.
 * 마찬가지로 reserve 내에서 `lost`를 포함하는 값이 있으면 걸러준다.
 * ex) `lost = [1,3,5] reserve = [1,4]` 를
 * ex) `realLost = [3,5] realReserve = [4]` 로 만든다.
 *
 * 2. 가진 사람 수를 `n-realLost`로 초기화한다.
 *
 * 3. 비교를 쉽게 하기 위해 오름차순으로 정렬해준다.
 * `sort`를 이용한다.
 *
 * 4. `realReserve`가 `realLost+1`을 포함할 떄와 `realReserve`가 `realLost-1`을 포함할 때로 나누어준다.
 * 이 둘중 하나 포함한다면 answer를 1 증가시켜준다.
 * splice를 활용해 각각 `realLost[i]+1`, `realLost-1`의 index에서 1만큼 잘라준다.(배열 내 삭제)
 */