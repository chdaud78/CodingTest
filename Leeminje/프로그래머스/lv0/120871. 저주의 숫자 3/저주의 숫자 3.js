function solution(n) {
    let num = 0;
    let arr = [];
    
    while (arr.length !== n) {
        if (num%3 !==0 && !String(num).includes('3')) arr.push(num);
        num++;
    }
    
    return arr.pop();
}