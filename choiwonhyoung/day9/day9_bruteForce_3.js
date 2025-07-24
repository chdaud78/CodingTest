function solution(n, wires) {
    let answer = 101;
    let tree = Array.from(Array(n + 1), () => []);
    
    wires.map((element) => {
        let [a, b] = element;
        tree[a].push(b);
        tree[b].push(a);
    });

    function dfs(node, except, visited) {
        visited[node] = true;
        let count = 1;

        tree[node].forEach((element) => {
            if (element !== except && visited[element] === false) {
                count += dfs(element, except, visited);
            }
        });

        return count;
    }

    wires.forEach(element => {
        let [a, b] = element;
        const visited = Array.from({ length: n + 1 }, () => false);
        const aCount = dfs(a, b, visited);

        const visited2 = Array.from({ length: n + 1 }, () => false);
        const bCount = dfs(b, a, visited2);

        answer = Math.min(answer, Math.abs(aCount - bCount));
    });

    return answer;
}
// 블로그 참고를... 많이 했습니다... 제가 직접 한번더 풀어보겠습니다