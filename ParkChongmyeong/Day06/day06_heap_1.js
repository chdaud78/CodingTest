/** ✏️ 목표
 * - 스코빌 지수를 섞어가며 모든 스코빌 지수를 K 이상으로 만들기
 *
 * ► 예상 로직 1
 * 1. 주어진 스코빌 지수를 정렬
 * 2. while() { 정렬한 스코빌 지수를 토대로 작은 값 두개 가져오기
 * 3. 두개를 섞어 다시 배열에 추가
 * 4. 다시 정렬해 주기 }
 * 5. 반복하며 모든 값 k보다 크게 만들며 횟수 저장
 * 6. 횟수를 return
 */

// 최소 힙 구현
// 외우기 어려워서 블로그 참고했습니다,,
class Heap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(idx) {
    return Math.floor((idx - 1) / 2);
  }

  getRightChildIndex(idx) {
    return idx * 2 + 2;
  }

  getLeftChildIndex(idx) {
    return idx * 2 + 1;
  }

  hasParent(idx) {
    return this.getParentIndex(idx) >= 0;
  }

  add(val) {
    this.heap.push(val);
    this.heapifyUp();
  }

  remove() {
    if(this.heap.length === 0) return null;

    const top = this.heap[0];

    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown();

    return top;
  }

  heapifyUp(val) {
    let idx = this.heap.length - 1;
    while(this.hasParent(idx)) {
      let parentIdx = this.getParentIndex(idx);
      if(this.heap[parentIdx] > this.heap[idx]) {
        this.swap(parentIdx, idx);
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  heapifyDown() {
    let idx = 0;
    while(this.getLeftChildIndex(idx) < this.heap.length) {
      let smallerIdx = this.getLeftChildIndex(idx);
      const rightIdx = this.getRightChildIndex(idx);
      if(
        rightIdx < this.heap.length && this.heap[rightIdx] < this.heap[smallerIdx]
      ) {
        smallerIdx = rightIdx
      }
      if(this.heap[smallerIdx] < this.heap[idx]) {
        this.swap(smallerIdx, idx);
        idx = smallerIdx
      } else {
        break;
      }
    }
  }

  swap(a,b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  peek() {
    return this.heap[0] || null;
  }

  size() {
    return this.heap.length;
  }
}

function solution(scoville, K) {
  let answer = 0;
  const heap = new Heap();

  // 힙 추가
  for(let s of scoville) {
    heap.add(s);
  }

  while(heap.peek() < K) {
    if(heap.size() < 2) return -1;

    const first = heap.remove();
    const second = heap.remove();

    // 스코빌 지수 섞기
    const mix = first + second * 2;

    heap.add(mix);
    answer++;
  }

  return answer;
}

/**
 * 📖 풀이 과정 설명
 * 1️⃣ 최소 힙 구현(작은 값을 요구하므로)
 * 2️⃣ 주어지 배열 내 스코빌 지수들을 heap에 추가
 *  - 힙은 최소 힙으로 정렬을 하며 추가한다.
 *  - top이 가장 작은 값
 * 3️⃣ heap의 루트에 존재하는 값이 K보다 작으면 반복하며 수행
 *  - cf) peek() : 루트를 보여주는 함수
 *  - cf) remove() : 루트를 빼서 return 하는 값
 *  - 가장 작은 값 두개를 가져와 문제에서 주어진 대로 mix한다.
 *  - mix한 값을 다시 heap에 추가한다.(추가한 heap은 최소 정렬을 하며 수행하므로 항상 정렬 상태가 된다.)
 *  - 횟수를 추가해준다.
 */

// 처음 코드
function solution(scoville, K) {
  let count = 0;
  scoville.sort((a, b) => a - b);

  while (scoville.length > 1 && scoville[0] < K) {
    const first = scoville.shift();       // 가장 작은 값
    const second = scoville.shift();      // 두 번째로 작은 값

    const mix = first + second * 2;
    scoville.push(mix);

    scoville.sort((a, b) => a - b);       // 정렬 다시
    count++;
  }

  return scoville[0] >= K ? count : -1;
}
/**
 * ❌ 실패 이유
 * while문 안에서 sort를 하기 때문에 시간 복잡도가 O(N^2 logN)이 되기 때문에 효율성에서 탈락
 *
 * ✔️ 개선 할 점
 * 문제에서 주어진 대로 최소 힙 구현 후 힙을 이용하여 최소 값을 찾아서 가져오는게 성능에서 좋다.
 **/