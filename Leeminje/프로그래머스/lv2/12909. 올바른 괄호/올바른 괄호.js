function solution(s){
    let cnt = 0;
    
    for(let i of s) {
        i === "(" ? cnt++ : cnt--;
        if (cnt < 0) break;
    }
    
    return cnt === 0 ? true : false
}