// 가장 먼 노드

/**
 * ✏️ 목표
 * - 1번 노드에서 가장 멀리 떨어지 노드의 갯수 찾기
 *
 * ► 예상 로직 (BFS(너비 우선 탐색) 사용)
 * 1. 배열을 통해 연결된 그래프 그리기
 * 2. 0으로 초기화한 거리 배열 만들기
 * 3. bfs로 탐색하며 graph 내의 거리 설정하기
 * 4. 거리 중 가장 큰값의 수 구하기
 */


function solution(n, edge) {
  let answer = 0;
  let graph = Array.from({length : n+1}, () => []);

  for(const [a,b] of edge) {
    graph[a].push(b);
    graph[b].push(a);
  }

  let distance = Array(n+1).fill(0);
  let queue = [1];

  distance[1] = 1;

  while(queue.length) {
    const cur = queue.shift();

    for(const next of graph[cur]) {
      if(distance[next] === 0) {
        distance[next] = distance[cur] + 1;
        queue.push(next);
      }
    }
  }

  const max = Math.max(...distance);

  return answer = distance.filter(x => x=== max).length;
}

/**
 * 📖 풀이 과정 설명
 * 1. edge를 순회하면 양방향 그래프 만들기
 * 1-1. `graph[a].push(b)`를 통해 a번 index와 b가 연관된을 저장
 * 1-2. `graph[b].push(a)`를 통해 b번 index와 a가 연관됨을 저장
 * 2. `n+1` 만큼 0으로 채워진 거리 배열 만들기
 * 3. `distance[1] = 1`으로 값을 주어 1번은 순회했음을 표시
 * 4. `bfs`로 탐색시작
 * 5. `queue`는 순회할 인접노드의 값을 저장한다.
 * 6. 거리가 0이면 순회한적 없으므로 현재 노드의 거리에 1을 더해준다.
 * 7. 다음 순회할 곳을 `queue`에 저장한다.
 * 8. `Math.max`로 거리의 최댓값을 저장한다.
 * 9. `max`값과 같은 값을 필터하여 갯수를 찾아준다.
 */

/**
 * graph
 * 0 : []
 * 1: [3,2]
 * 2: [3,1,4,5]
 * 3: [6,4,2,1]
 * 4: [3,2]
 * 5: [2]
 * 6: [3]
 */
