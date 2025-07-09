const solution = (arr, divisor) => {
    let sortArr = arr.filter(e => e % divisor === 0).sort((a, b) => a - b);
    return sortArr.length !== 0 ? sortArr : [-1];
}