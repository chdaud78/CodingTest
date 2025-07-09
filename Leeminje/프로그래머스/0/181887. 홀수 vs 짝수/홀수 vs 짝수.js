const solution = nums => 
    Math.max(
        ...nums.reduce((acc, cur, i) => {
            acc[i % 2] += cur;
            return acc;
        }, [0, 0]));