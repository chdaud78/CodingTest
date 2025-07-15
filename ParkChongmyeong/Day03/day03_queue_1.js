function solution(progresses, speeds) {
  let answer = [];

  // 개발 남은 속도 / 속도 = 개발에 걸리는 시간
  let queue = progresses.map((x,i) => Math.ceil((100-x)/speeds[i]));
  // queue 이후 더 큰 값을 찾기 위한 임시 변수
  let tmpMax = queue[0]
  let cnt = 1;

  console.log(queue)

  // queue[0]를 건너뛴 부분 부터 시작(첫번째는 무조건 실행해야하므로)
  for(let i = 1 ; i <= queue.length ; i++) {
    if(queue[i] <= tmpMax) {
      cnt++;
    } else {
      answer.push(cnt);
      tmpMax = queue[i];
      cnt= 1;
    }
  }

  return answer;
}

// 5
// 10,1,1
// 20,1