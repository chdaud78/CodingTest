function solution(begin, target, words) {
  const visited = new Set(); // 방문한 단어 저장
  const queue = [[begin, 0]]; // 시작 단어와 현재까지 변환 횟수

  // 한 글자만 다른지 확인하는 함수
  function isCorrect(word1, word2) {
    let diff = 0;
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] !== word2[i]) diff++;
    }
    return diff === 1;
  }

  // BFS 시작
  while (queue.length > 0) {
    const [current, steps] = queue.shift(); // 현재 단어와 단계 수

    // 목표 단어에 도달하면 변환 횟수 반환
    if (current === target) return steps;

    // 연결된 단어 탐색
    for (const nextWord of words) {
      // 아직 방문 안 했고, 한 글자 차이라면
      if (!visited.has(nextWord) && isCorrect(current, nextWord)) {
        visited.add(nextWord); // 방문 처리
        queue.push([nextWord, steps + 1]); // 다음 탐색 대기
      }
    }
  }

  // 변환 불가능한 경우
  return 0;
}
