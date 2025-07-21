//디스크 컨트롤러
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  add(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIdx = Math.floor((index - 1) / 2);
      if (this.heap[parentIdx][1] <= this.heap[index][1]) break;
      this.swap(index, parentIdx);
      index = parentIdx;
    }
  }

  pop() {
    if (this.heap.length <= 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    while (true) {
      let left = index * 2 + 1;
      let right = index * 2 + 2;
      let smallest = index;

      if (left < length && this.heap[left][1] < this.heap[smallest][1]) {
        smallest = left;
      }
      if (right < length && this.heap[right][1] < this.heap[smallest][1]) {
        smallest = right;
      }
      if (smallest === index) break;
      this.swap(index, smallest);
      index = smallest;
    }
  }
}

function solution(jobs) {
  jobs.sort((a, b) => a[0] - b[0]); // 요청 시간 기준 정렬
  const heap = new MinHeap();
  let time = 0;
  let total = 0;
  let i = 0;
  let count = 0;

  while (count < jobs.length) {
    // 현재 시점까지 요청된 작업을 heap에 추가
    while (i < jobs.length && jobs[i][0] <= time) {
      heap.add(jobs[i]);
      i++;
    }

    if (heap.size() > 0) {
      const [start, duration] = heap.pop();
      time += duration;
      total += time - start;
      count++;
    } else {
      time = jobs[i][0]; // 다음 작업이 올 때까지 기다림
    }
  }

  return Math.floor(total / jobs.length);
}
