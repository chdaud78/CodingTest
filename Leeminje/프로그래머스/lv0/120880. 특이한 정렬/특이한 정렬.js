const solution = (numlist, n) => numlist.sort((a, b) => {
        const [i, j] = [Math.abs(a-n), Math.abs(b-n)];
        return (i===j) ? b-a : i-j;
});