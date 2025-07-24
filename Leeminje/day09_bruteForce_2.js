// 피로도

/**
 * ✏️ 문제 개요
 * 유저는 주어진 피로도(k)를 바탕으로 여러 개의 던전을 탐험할 수 있음.
 * 각 던전은 [최소 필요 피로도, 소모 피로도] 형태로 주어짐.
 *
 * ✏️ 목표
 * - 순서를 조합해 던전을 최대한 많이 탐험할 수 있도록 탐색
 * - 한 번 방문한 던전은 다시 방문할 수 없음
 * - 가능한 최대 탐험 던전 수를 반환
 *
 * ✏️ 예상 로직
 * 1. DFS (깊이 우선 탐색) + 백트래킹으로 모든 경우 탐색
 * 2. visited 배열을 통해 던전 중복 방문 방지
 * 3. 피로도가 부족하면 해당 분기 종료
 */

// 기본 풀이
function solution(k, dungeons) {
  let maxCount = 0; // 최대 탐험 수 저장
  const n = dungeons.length; // 던전 개수
  const visited = Array(n).fill(false); // 방문 여부 추적

  // 1️⃣ DFS 탐색 함수
  function explore(fatigue, depth) {
    maxCount = Math.max(maxCount, depth); // 최대 탐험 수 갱신

    for (let i = 0; i < n; i++) {
      const [required, consume] = dungeons[i];

      // 2️⃣ 방문하지 않았고, 피로도가 충분하면 탐험
      if (!visited[i] && fatigue >= required) {
        visited[i] = true;
        explore(fatigue - consume, depth + 1);
        visited[i] = false; // 3️⃣ 백트래킹
      }
    }
  }

  explore(k, 0); // 초기 피로도와 깊이 0에서 탐색 시작
  return maxCount;
}

/**
 * 📖 풀이과정
 *
 * 0️⃣ visited 배열 생성
 * - 던전 개수만큼 false 초기화
 * - 중복 방문 방지를 위한 플래그 역할
 *
 * 1️⃣ DFS 탐색 (explore 함수)
 * - 현재 피로도로 탐험 가능한 던전을 반복 탐색
 * - 조건: 아직 방문하지 않았고, 현재 피로도로 입장 가능
 *
 * 2️⃣ 방문 처리 후 피로도 감소, 깊이 증가하여 재귀 호출
 * - 탐험을 진행하면서 count를 depth로 누적
 *
 * 3️⃣ 모든 탐색이 끝나면 방문 여부를 원상복구 (백트래킹)
 *
 * ✅ 종료 후 maxCount 반환
 * - 모든 경로 중 가장 깊게 들어간 탐험 횟수
 */
