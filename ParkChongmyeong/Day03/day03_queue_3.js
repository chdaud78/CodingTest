function solution(bridge_length, weight, truck_weights) {
  let time = 0;
  let bridge = Array(bridge_length).fill(0); // 다리를 나타내는 큐
  let bridgeWeight = 0; // 다리 위 총 무게

  while (truck_weights.length > 0 || bridgeWeight > 0) {
    time++;

    // 1. 한 칸 전진 (맨 앞 트럭이 다리에서 내려감)
    const leftTruck = bridge.shift();
    bridgeWeight -= leftTruck;

    // 2. 다음 트럭을 올릴 수 있으면 올림
    const nextTruck = truck_weights[0];
    if (nextTruck && bridgeWeight + nextTruck <= weight) {
      bridge.push(nextTruck);
      bridgeWeight += nextTruck;
      truck_weights.shift();
    } else {
      bridge.push(0); // 아무 트럭도 못 올림
    }
  }

  return time;
}