//더 맵게
class Minheap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }
// 수정 전 코드
// size() {
//   return this.heap.length(); 
// } 


  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  add(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    let parentIdx = Math.floor((index - 1) / 2);

    while (
      parentIdx >= 0 &&
      this.heap[index] < this.heap[parentIdx]
      //수정 전 코드
      //this.heap[index][1] < this.heap[parentIdx][1] 
      // 이 코드는 value가 배열 형태일때 사용해야함
      //이 문제는 숫자만 취급하고 있음
    ) {
      this.swap(index, parentIdx);
      index = parentIdx;
      parentIdx = Math.floor((index - 1) / 2);
    }
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  }
  //계속 뭔가 빠진거같았는데 pop을 구현 안했었다...

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      let leftIdx = index * 2 + 1;
      let rightIdx = index * 2 + 2;
      let smallest = index;

      if (leftIdx < length && this.heap[leftIdx] < this.heap[smallest]) {
        smallest = leftIdx;
      }

      if (rightIdx < length && this.heap[rightIdx] < this.heap[smallest]) {
        smallest = rightIdx;
      }

      if (smallest === index) break;

      this.swap(index, smallest);
      index = smallest;
    }
  }

  peek() {
    return this.heap[0];
  }
}
function solution(scoville, K) {
  const heap = new Minheap();

  for (let s of scoville) {
    heap.add(s);
  }

  let count = 0;

  while (heap.size() >= 2 && heap.peek() < K) {
    const first = heap.pop();
    const second = heap.pop();

    if (first === undefined || second === undefined) return -1;

    const mixed = first + second * 2;
    heap.add(mixed);
    count++;
  }

  return heap.peek() >= K ? count : -1;
}
