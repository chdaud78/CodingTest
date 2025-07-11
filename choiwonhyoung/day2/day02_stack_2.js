function solution(s) {
    const answer = [];

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (char === '(') {
            answer.push(char);
        } else { // char === ')'
            if (answer.length === 0) {
                return false;
            }
            answer.pop();
        }
    }

    return answer.length === 0;
}