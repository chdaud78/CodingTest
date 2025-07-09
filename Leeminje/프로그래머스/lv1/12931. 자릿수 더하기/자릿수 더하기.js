const solution = (n) =>{
    return String(n).split('').map(arg => Number(arg)).reduce((a, b) => a + b, 0);
}