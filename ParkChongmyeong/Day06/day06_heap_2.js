class MinHeap {
  constructor() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  push(item) {
    this.items.push(item);
    this.bubbleUp();
  }

  pop() {
    if (this.size() === 0) return null;

    const min = this.items[0];
    this.items[0] = this.items[this.size() - 1];
    this.items.pop();
    this.bubbleDown();
    return min;
  }

  swap(a, b) {
    [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
  }

  bubbleUp() {
    let index = this.size() - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.items[parentIndex][1] <= this.items[index][1]) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;
    while (index * 2 + 1 < this.size()) {
      let leftChild = index * 2 + 1;
      let rightChild = index * 2 + 2;
      let smallerChild = leftChild;

      if (
        rightChild < this.size() &&
        this.items[rightChild][1] < this.items[leftChild][1]
      ) {
        smallerChild = rightChild;
      }

      if (this.items[index][1] <= this.items[smallerChild][1]) break;

      this.swap(index, smallerChild);
      index = smallerChild;
    }
  }
}

function solution(jobs) {
  let time = 0;
  let i = 0;
  let totalTime = 0;
  let count = jobs.length;

  jobs.sort((a,b) => a[0] - b[0]);

  const heap = new MinHeap();

  while(i < count || heap.size() > 0) {

    // 현재 시간에 도달한 작업들 push
    while(i < count && jobs[i][0] <= time) {
      heap.push(jobs[i]);
      i++;
    }

    if(heap.size() > 0) {
      const[start,duration] = heap.pop();
      time+=duration;
      totalTime += time - start; // 반환시간 = 끝난시간 - 시작시간
    } else {
      time = jobs[i][0]; // 다음 작업이 들어올 때까지 대기
    }
  }

  return Math.floor(totalTime / count);
}

/*
* 못풀어서 참고했습니다.
* https://velog.io/@frontendohs/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EB%94%94%EC%8A%A4%ED%81%AC-%EC%BB%A8%ED%8A%B8%EB%A1%A4%EB%9F%AC-JS
* 차후에 복습 때 다시한번 더 도전하도록 하겠습니다...ㅠ
* */
