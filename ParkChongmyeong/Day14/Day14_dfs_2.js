/**
 * ✏️ 목표
 * - 주어진 단어 목록 내 단어들로만 변환하여 목표 단어까지 도달하는 최소 단계 수
 *
 * ► 예상 로직 (BFS)
 * 1. begin부터 시작해 한 글자 차이나는 단어들로 이동
 * 2. 방문 기록하여 중복 방지
 * 3. target에 도달하면 변환 단계 반환
 */

function solution(begin, target, words) {
  if (!words.includes(target)) return 0;

  const visited = new Array(words.length).fill(false);
  const queue = [];
  queue.push([begin, 0]);

  while (queue.length > 0) {
    const [current, steps] = queue.shift();

    if (current === target) return steps;

    for (let i = 0; i < words.length; i++) {
      if (!visited[i] && canChange(current, words[i])) {
        visited[i] = true;
        queue.push([words[i], steps + 1]);
      }
    }
  }

  return 0;
}

// 두 단어가 한 글자만 다른지 확인하는 함수
function canChange(word1, word2) {
  let count = 0;
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] !== word2[i]) count++;
    if (count > 1) return false;
  }
  return count === 1;
}

/**
 * 📖 풀이 과정 설명
 * 1. begin을 큐에 넣고 단계 0으로 시작
 * 2. 큐에서 단어를 꺼내서 words 내 한 글자만 다른 단어들 탐색
 * 3. 방문하지 않은 단어면 큐에 넣고 단계 +1
 * 4. target 만나면 그 단계 수 반환
 * 5. 못 만나면 0 반환
 */