/** ✏️ 목표
 * - 모든 음식의 스코빌 지수를 K 이상으로 만들기 위한 최소 섞기 횟수를 구하라
 * - 가장 스코빌 지수가 낮은 두 음식을 섞어서 새로운 음식 생성: 섞은 음식 = 가장 맵지 않은 음식 + (두 번째로 맵지 않은 음식 × 2)
 * - 모든 음식이 K 이상이면 종료
 * - 최소 횟수를 반환하되, 불가능한 경우 -1 반환
 *
 * ► 예상 로직
 * 1. 스코빌 배열을 MinHeap에 저장
 * 2. heap의 최솟값이 K 이상이 될 때까지 반복
 * 3. 스코빌 지수가 가장 낮은 두 음식 꺼내서 섞고 다시 push
 * 4. 반복 횟수를 세고 반환
 * 5. 음식이 1개 이하일 때 종료 조건 체크
 *
 * ► 주의사항
 * - 최소힙 자료구조 직접 구현 필요 (JavaScript에 내장 MinHeap이 없음)
 * - 시간복잡도: O(n log n)
 */

// ✅ 최소힙 클래스 정의
class MinHeap {
  constructor() {
    this.heap = [];
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }
  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  peek() {
    return this.heap[0];
  }

  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return root;
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (this.getParentIndex(index) >= 0 && this.heap[this.getParentIndex(index)] > this.heap[index]) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  heapifyDown() {
    let index = 0;
    while (this.getLeftChildIndex(index) < this.heap.length) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallerChildIndex]) {
        smallerChildIndex = rightChildIndex;
      }

      if (this.heap[index] < this.heap[smallerChildIndex]) break;

      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }

  size() {
    return this.heap.length;
  }
}

// 🧪 실제 문제 풀이 함수
function solution(scoville, K) {
  const heap = new MinHeap();

  // 1️⃣ 초기 음식들을 힙에 삽입
  for (const s of scoville) {
    heap.push(s);
  }

  let mixCount = 0;

  // 2️⃣ 가장 맵지 않은 음식이 K 이상이 될 때까지 반복
  while (heap.peek() < K) {
    // 3️⃣ 음식이 하나 남았는데도 K 이상이 안 되면 실패
    if (heap.size() < 2) return -1;

    const first = heap.pop(); // 가장 맵지 않은 음식
    const second = heap.pop(); // 두 번째로 맵지 않은 음식
    const mixed = first + second * 2;

    heap.push(mixed); // 4️⃣ 섞은 음식 다시 넣기
    mixCount++;
  }

  return mixCount;
}

/**
 * 📖 풀이 과정 설명
 *
 * 1️⃣ 최소힙 사용 이유
 * - 매번 가장 맵지 않은 두 개를 빠르게 꺼내야 하므로, 최소값을 O(log n)에 꺼낼 수 있는 MinHeap이 필수임,
 * - JavaScript는 내장 MinHeap이 없기 때문에 직접 구현.
 *
 * 2️⃣ 음식 섞기 로직
 * - 두 음식의 스코빌 지수를 꺼내고 섞어서 새로운 음식을 만든 후 다시 힙에 넣기
 * - 이 과정을 반복하면서 섞은 횟수를 기록함.
 *
 * 3️⃣ 종료 조건
 * - 힙의 최솟값이 K 이상이면 성공
 * - 음식이 1개 이하인데 K 미만이면 실패 (-1 반환)
 *
 * 🔁 시간복잡도
 * - 삽입 및 삭제: O(log n)
 * - 반복 최대 횟수: n
 * → 총 시간복잡도는 O(n log n)
 */
