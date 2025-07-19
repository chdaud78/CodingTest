// 이중 우선 순위 큐

/** ✏️ 목표
 * - 주어진 명령어에 맞게 큐 삽입 삭제
 *
 * ► 예상 로직 1
 * 1. operation을 split하여 명령어와 데이터로 나눈다.
 * 2. I일 경우 푸쉬
 * 3. 아닐 경우
 * 3-1 num 이 1일 경우 pop
 * 3-2 1이 아니면 shift
 * 4. 정답 리턴
 */

function solution(operations) {
  let answer = [];

  for(let i = 0 ; i < operations.length ; i++) {
    const commend = operations[i].split(" ")[0];
    const num = Number(operations[i].split(" ")[1]);

    if(commend === "I") {
      answer.push(num);
      answer.sort((a,b) => a-b);
    }
    else {
      if(num === 1) answer.pop();
      else answer.shift();
    }
  }
  return answer.length === 0 ? [0,0] : [Math.max(...answer), Math.min(...answer)];
}

/**
 * 📖 풀이 과정 설명
 * 1️⃣ split함수를 통해 operation 분리
 * - commend : 명령어
 * - num : 데이터
 * 2️⃣ I일 경우
 * - push함수로 데이터 저장
 * - answer를 정렬
 * 3️⃣ I가 아닐 경우
 * - 1이면 pop
 * - 아니면 shift
 */