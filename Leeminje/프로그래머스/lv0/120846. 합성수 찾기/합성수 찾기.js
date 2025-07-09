const solution = n => {
    let answer = 0;

    for (let i = 4; i <= n; i++) {
        let limit = Math.floor(Math.sqrt(i));
        for (let j = 2; j <= limit; j++) {
						if (i % j === 0) {
                answer++;
                break;
            }
				}
    }

    return answer;
}