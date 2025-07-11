function solution(arr)
{
    var answer = [];
    // 단순하게 배열을 순회하기 때문에 for-of 문이 훨신 좋은 것 같음
        for (const el of arr) {
            //length - 1 보다는 at가 훨씬 안정적으로 값에 접근이 가능한 것 같음
            if (answer.length === 0 || answer[answer.at(-1)] !== el) {
              answer.push(arr[i]);
            }
        }
    return answer;
}