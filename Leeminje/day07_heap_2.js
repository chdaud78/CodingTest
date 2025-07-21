/** ✏️ 목표
 * - 큐에 숫자를 삽입하거나, 최댓값 또는 최솟값을 삭제할 수 있는 자료구조를 구현하라
 * - 연산 결과 큐가 비어있으면 [0, 0], 아니면 [최댓값, 최솟값]을 반환
 *
 * ► 예상 로직
 * 1. 최소 힙(minHeap)과 최대 힙(maxHeap)을 함께 사용
 * 2. 삽입 시 두 힙에 모두 값을 추가
 * 3. 삭제 시: 힙에서 유효한 값만 꺼낼 수 있도록 visited Map 사용
 * 4. 마지막에는 힙에서 유효한 최댓값과 최솟값을 각각 추출
 */

class Heap {
  constructor(compare) {
    this.data = [];
    this.compare = compare; // 정렬 기준: a - b → 최소힙, b - a → 최대힙
  }

  push(val) {
    this.data.push(val);
    this._heapifyUp();
  }

  pop() {
    if (this.size() === 0) return null;
    const top = this.peek();
    const last = this.data.pop();
    if (this.size() !== 0) {
      this.data[0] = last;
      this._heapifyDown();
    }
    return top;
  }

  peek() {
    return this.data[0];
  }

  size() {
    return this.data.length;
  }

  _heapifyUp() {
    let idx = this.data.length - 1;
    const current = this.data[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.data[parentIdx];
      if (this.compare(current, parent) >= 0) break;
      this.data[idx] = parent;
      idx = parentIdx;
    }
    this.data[idx] = current;
  }

  _heapifyDown() {
    let idx = 0;
    const current = this.data[idx];
    const length = this.data.length;

    while (idx * 2 + 1 < length) {
      let leftIdx = idx * 2 + 1;
      let rightIdx = idx * 2 + 2;
      let smallestIdx = leftIdx;

      if (rightIdx < length && this.compare(this.data[rightIdx], this.data[leftIdx]) < 0) {
        smallestIdx = rightIdx;
      }

      if (this.compare(this.data[smallestIdx], current) >= 0) break;

      this.data[idx] = this.data[smallestIdx];
      idx = smallestIdx;
    }

    this.data[idx] = current;
  }
}

function solution(operations) {
  const minHeap = new Heap((a, b) => a - b); // 최소 힙
  const maxHeap = new Heap((a, b) => b - a); // 최대 힙
  const visited = new Map(); // 삽입된 숫자의 개수 저장

  for (let op of operations) {
    const [command, valueStr] = op.split(' ');
    const value = Number(valueStr);

    if (command === 'I') {
      // 삽입: 두 힙에 넣고 카운팅
      minHeap.push(value);
      maxHeap.push(value);
      visited.set(value, (visited.get(value) || 0) + 1);
    } else if (command === 'D') {
      const heap = value === 1 ? maxHeap : minHeap;

      // 유효한 값만 제거
      while (heap.size()) {
        const target = heap.pop();
        if (visited.get(target)) {
          visited.set(target, visited.get(target) - 1);
          break;
        }
      }
    }
  }

  // 마지막 정리: 유효하지 않은 값 제거
  const validMax = () => {
    while (maxHeap.size()) {
      const val = maxHeap.peek();
      if (visited.get(val)) return val;
      else maxHeap.pop();
    }
    return null;
  };

  const validMin = () => {
    while (minHeap.size()) {
      const val = minHeap.peek();
      if (visited.get(val)) return val;
      else minHeap.pop();
    }
    return null;
  };

  const max = validMax();
  const min = validMin();

  return max === null ? [0, 0] : [max, min];
}

/**
 * 📖 풀이 과정 설명
 * 1️⃣ 최소/최대 힙 동시 사용
 * - 최소값과 최대값을 각각 빠르게 접근하기 위해 두 개의 힙을 사용
 * - 자바스크립트에는 내장 힙이 없기 때문에, 클래스를 직접 정의
 *
 * 2️⃣ 삽입 연산 "I n"
 * - 두 힙에 모두 n을 삽입.
 * - visited Map에 해당 숫자의 개수를 1 증가시킴.
 *
 * 3️⃣ 삭제 연산 "D 1" 또는 "D -1"
 * - 최대값 삭제: maxHeap에서 유효한 값이 나올 때까지 꺼냄.
 * - 최소값 삭제: minHeap에서 유효한 값이 나올 때까지 꺼냄.
 * - 꺼낸 값의 visited 카운트를 감소시켜 동기화함.
 *
 * 4️⃣ 최종 정리
 * - 각 힙에서 아직 남아 있는 유효한 최댓값/최솟값을 꺼냄
 * - 둘 다 없으면 → [0, 0] 반환, 아니면 → [최댓값, 최솟값] 반환
 *
 * ✅ 시간복잡도 분석
 * - n: operations의 길이 (최대 1,000,000)
 * - heap.push / pop: O(log n)
 * - 각 연산당 평균 시간 복잡도: O(log n)
 * - 전체 연산 복잡도: O(n log n)
 **/
