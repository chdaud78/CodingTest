function solution(n, computers) {
    const visited = Array(n).fill(false); // 방문 여부 체크
    let networkCount = 0; // 네트워크 개수

    for (let i = 0; i < n; i++) {
        // 아직 방문하지 않은 컴퓨터에서 탐색 시작
        if (!visited[i]) {
            bfs(i);
            networkCount++;
        }
    }
    function bfs(start) {
        const queue = [start];
        visited[start] = true;

        while (queue.length > 0) {
            const current = queue.shift();
            // 현재 컴퓨터와 연결된 다른 컴퓨터 탐색
            for (let j = 0; j < n; j++) {
                if (computers[current][j] === 1 && !visited[j]) {
                    visited[j] = true;
                    queue.push(j);
                }
            }
        }
    }
    return networkCount;
}
