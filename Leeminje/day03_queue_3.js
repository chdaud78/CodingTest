// 다리를 지나는 트럭

/**
 * ✏️ 문제 개요
 * 트럭들이 일정 무게 제한과 길이를 가진 다리를 지나가는데,
 * 모든 트럭이 건너는 데 걸리는 시간을 구하는 문제
 * ✏️ 목표
 * - 트럭들이 다리를 건너는 총 시간을 계산
 * - 무게 제한과 다리 길이를 고려하여 트럭이 순차적으로 이동
 * - 다리를 지나며 무게를 초과하지 않도록 시뮬레이션
 * ✏️ 예상 로직
 * 1. 다리 위 상태를 길이 고정된 큐로 시뮬레이션
 * 2. 매 초마다:
 *    - 앞에 있는 트럭이 빠짐 → shift()
 *    - 다음 트럭이 무게 조건을 만족하면 진입 → push()
 *    - 아니면 0을 넣어 빈칸 유지
 * 3. 모든 트럭이 다리를 지난 시점의 시간을 리턴!
 *
 * ... 이게 되나?
 */

// 초기 코드
function solution(bridge_length, weight, truck_weights) {
  // 1️⃣ 다리 위 트럭 상태를 시뮬레이션
  const bridge = Array(bridge_length).fill(0);
  let [time, totalTruckWeight] = [0, 0];

  while (truck_weights.length > 0 || totalTruckWeight > 0) {
    time++;
    totalTruckWeight -= bridge.shift();

    const nextTruckWeight = truck_weights[0];

    // 2️⃣ 무게 조건을 체크하며 트럭을 투입
    if (totalTruckWeight + nextTruckWeight <= weight) {
      const currentTruck = truck_weights.shift();
      bridge.push(currentTruck);
      totalTruckWeight += bridge[bridge.length - 1];
    } else {
      bridge.push(0);
    }
  }

  return time;
}

/** 📖 풀이 과정
 * 0️⃣ 왜 Array.fill()로 초기 다리 상태를 만들었는가?
 * - 다리는 고정 길이 → 매초 1칸씩 트럭이 이동 → bridge.length = bridge_length
 * - 트럭이 없으면 0을 채워서 타이밍 유지
 *
 * 1️⃣ 다리 위 트럭 상태를 시뮬레이션
 * - 트럭이 들어가면 push(), 나가면 shift()
 * - 매초마다 다리 상태를 변경하며 시간 흐름을 반영
 *
 * 2️⃣ 무게 조건을 체크하며 트럭을 투입
 * - 트럭이 진입 가능하면 → 다리 끝에 추가
 * - 불가능하면 0 추가 → 다음 턴까지 기다리기
 */

// 기존 코드 (최적화 진행)
function solution(bridge_length, weight, truck_weights) {
  const bridgeQueue = Array(bridge_length).fill(0);
  let completeTime = 0;
  let sumTruckWeight = 0;

  while (truck_weights.length || sumTruckWeight) {
    completeTime++;

    const outTruck = bridgeQueue.shift();
    sumTruckWeight -= outTruck;

    const nextTruck = truck_weights[0];
    // 1️⃣ canEnter 조건을 한 줄로 작성
    const canEnter = nextTruck !== undefined && sumTruckWeight + nextTruck <= weight;

    // 2️⃣ 트럭 진입을 한 줄로 처리
    const enteringTruck = canEnter ? truck_weights.shift() : 0;
    bridgeQueue.push(enteringTruck);

    sumTruckWeight += enteringTruck;
  }

  return completeTime;
}

/** 📖 풀이 과정
 * 0️⃣ 배열 대신 큐처럼 사용한 이유
 * - bridgeQueue.shift() → 앞 트럭 나가기
 * - push() → 뒤에서 트럭 들어오기
 * - FIFO 구조 = 선입선출 큐
 *
 * 1️⃣ canEnter 조건을 한 줄로 작성
 * - 조건 체크를 간결하게 처리
 * - 조건에 따라 shift() 또는 0을 push
 *
 * 2️⃣ 트럭 진입을 한 줄로 처리
 * - if/else 대신 삼항 연산자로 코드를 단축
 * - 진입 여부와 상태 push를 분리 없이 처리
 */
