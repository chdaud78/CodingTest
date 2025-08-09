// 징검다리

/**
 * ✏️ 목표
 * - 바위를 제거하며 바위간의 거리의 최솟값중에 가장 큰 값 찾기
 *
 * ► 예상 로직 (이분탐색: 파라메트릭 서치)
 * 1. 거리의 중간 값을 구한다.
 * 2. 중간값과 (현재 돌 - 이전 돌)을 비교하여 작으면 돌을 제거한다.
 * 3. 아니면 현재 돌을 설정해준다.
 * 4. remove한 값과 주어진 n값을 비교하여 정답을 구한다.
 */

function solution(distance, rocks, n) {
  let answer = 0;
  let left = 1;
  let right = distance;

  rocks.sort((a,b) => a-b);

  while(left <= right) {
    const mid = Math.floor((left + right)/2);
    let remove = 0;
    let prev = 0;

    for(const rock of rocks) {
      if(rock - prev < mid) {
        remove++;
      } else {
        prev = rock;
      }
    }

    if(distance - prev < mid) remove++;

    if(remove > n) {
      right = mid-1;
    } else{
      left = mid+1;
      answer = mid
    }
  }

  return answer;
}

/**
 * 📖 풀이 과정 설명
 *
 * 1. 최대 거리의 중간 값을 구해준다.
 * 2. rocks를 순회하며 현재 돌과 이전 돌의 차이가 중간 값보다 작으면 돌을 제거해준다.
 * 2-1. 만약 중간값 보다 크면 현재 돌을 이전으로 정해준다.
 * 3. 마지막 지점까지의 거리와 이전의 차이도 비교해 주어야 한다.
 * 4. 제거한 돌이 n보다크면 right를 하나씩 줄여준다.
 * 4-1. 제거한 돌이 n보다 작으면 left를 하나 늘려주고, 그떄의 answer를 중간값으로 설정해준다.
 */