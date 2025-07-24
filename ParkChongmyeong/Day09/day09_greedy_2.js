// 단속 카메라

/**
 * ✏️ 목표
 * - 최소 단속 카메라 수를 보여주기
 *
 * ► 예상 로직 1
 * 1. 단속 카메라를 정렬한다.
 * 2. 카메라는 최소 한대 필요하므로 1대로 초기화한다.
 * 3. 이전 차량의 진출이 다음 차량의 진입보다 작으면 서로 맞물리지 않으므로 카메라를 설치한다.
 * 이전 진출 < 다음 진입 이면 맞물리지 않음
 * 이전 진출 > 다음 진입 이면 맞물림
 * 4. 이전 차량의 진출이 다음 차량의 진출보다 크면 더 좁은 구간 유지위해 진출 시점을 갱신
 * 겹치는 구간의 끝부분을 좁게 줄여야 나중 차량과 계속 겹침
 */

function solution(routes) {
  let answer = 1;

  routes.sort((a,b) => a[0] - b[0]);

  let crossOut = routes[0][1]
  for(const route of routes) {
    if(crossOut < route[0]) {
      answer++;
      crossOut = route[1];
    }
    if(crossOut > route[1]){
      crossOut = route[1];
    }
  }
  return answer;
}

/**
 * 📖 풀이 과정 설명
 *
 * 1. 카메라는 최소 1대이므로 `answer=1`로 초기화
 * 2. 앞 차량 / 뒤 차량 비교를 위해 정렬해준다.
 * 3. crossOut(겹치는 구간)을 우선 첫 차량의 진출로 초기화
 * 4. 만약 corssOut(이전 차량의 진출)이 route[0](다음 차량의 진입) 보다 작으면 겹치지 않으므로
 * 카메라 설치(`answer++`)해준다.
 * crossOut을 다음 차량의 진출로 갱신해준다.
 * 5. 이전 차량의 진출이 다음 차량의 진출보다 크면 겹치는 구간의 끝부분을 좁게 줄임
 * ex) 차량 A:  [1, 10]   `crossOut = 10`
 * ex) 차량 B:    [2, 6]  `crossOut > 6` -> 겹침 `crossOut = 6`
 * ex) 차량 C:      [3, 4] `crossOut > 4` -> 겹침 `crossOut = 4`
 */