const solution = (a, b) => {
    while (b%2 === 0) b/=2;
    while (b%5 === 0) b/=5;
    return b===1 ? 1 : (a%b === 0 ? 1 : 2);
};