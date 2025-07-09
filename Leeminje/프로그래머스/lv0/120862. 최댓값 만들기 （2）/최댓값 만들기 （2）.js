const solution = numbers => {
    let num = [...numbers.sort((a,b) => a-b)];
    return Math.max(num[0]*num[1], num[num.length-1]*num[num.length-2]);
}