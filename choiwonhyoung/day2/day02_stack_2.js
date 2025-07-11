function solution(s) {
    const answer = [];

    //기존 코드 : for (let i = 0; i < s.length; i++)   
    // 전체 문자열을 인덱스로만 순회하기 때문에 for-of 문을 이용하여 직접 순회
    for (const char of s){
        if (char === '(') {
            answer.push(char);
        } else { // char === ')'
            if (answer.length === 0) {
                return false;
            }
            answer.pop();
        }
    }

    return answer.length === 0;
}