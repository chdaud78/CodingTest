// 개선 전
/*function solution(citations) {
    var answer = 0;
    
    citations.sort((a,b) => b-a);
    
    for(let i = 0 ; i <= citations.length ; i++) {
        if(citations[i] >= i+1) answer = i+1;
    }
    
    return answer;
}*/
// 개선 후
function solution(citations) {
    citations.sort((a, b) => b - a);

    for (let i = 0; i < citations.length; i++) {
        if (citations[i] < i + 1) return i;
    }

    return citations.length;
}