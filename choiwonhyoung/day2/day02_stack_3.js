function solution(prices) {
    const answer = Array(prices.length).fill(0);
    const stack = [];

    for (let i = 0; i < prices.length; i++) {
        //.at()를 사용하면 해볼수록 뭔가 스택에 잘어울린다는 생각이 듬
        while (stack.length && prices[i] < prices[stack[stack.at(-1)]]) {
            const top = stack.pop();
            answer[top] = i - top;
        }
        stack.push(i);
    }

    while (stack.length) {
        const top = stack.pop();
        answer[top] = prices.length - 1 - top;
    }

    return answer;
}
