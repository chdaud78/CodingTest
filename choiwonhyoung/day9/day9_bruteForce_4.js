function solution(word) {
    const dict = [];
    const letters = ['A', 'E', 'I', 'O', 'U'];

    function dfs(current) {
        if (current.length > 5) return;

        if (current.length > 0) dict.push(current);

        for (let i = 0; i < letters.length; i++) {
            dfs(current + letters[i]);
        }
    }

    dfs("");

    dict.sort();

    return dict.indexOf(word) + 1;
}
