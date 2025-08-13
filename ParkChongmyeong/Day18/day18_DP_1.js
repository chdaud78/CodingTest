// 정수 삼각형

/**
 * ✏️ 목표
 * - 그래프를 아래로 내려가며 가장 큰 수의 합 찾기
 *
 * ► 예상 로직 (DP)
 * 1. 역으로 밑에서부터 더했을 때 더 큰 값을 찾아나간다.
 * 2. 깊이가 N인 그래프의 N-1 차수에서부터 더해가면 역으로 더 큰 수들을 찾아 거슬러 올라간다.
 * 3. `root`의 값이 가장 큰 값이 될 테니 `root`의 값을 `return`한다.
 */

function solution(triangle) {
  for(let i = triangle.length -2 ; i >= 0; i--) {
    for(let j = 0 ; j < triangle[i].length; j++) {
      triangle[i][j] += Math.max(triangle[i+1][j],triangle[i+1][j+1]);
    }
  }
  return triangle[0][0];
}

/**
 * 📖 풀이 과정 설명
 * 1. 위에서 부터 찾으면 `dfs`로 찾아야한다. 그떄는 효율성이 떨어질 수 있다.
 * 2. `bottom-top` 방식으로 밑에서 부터 더한 값이 큰 숫자들을 찾아 root 값을 바꾼다.
 * 3. `trinagle.length-2`의 값이 깊이가 N인 그래프의 N-1 번쨰이다.
 * N-1 부터 0까지 역으로 올라가며 `[i][j]` 를 `([i+1][j]와 [i+1][j+1])` 중 큰 값을 더해준다.
 * 4. 마지막 root는 가장 큰값이 더해진 것이므로 정답을 root로 return한다.
 */