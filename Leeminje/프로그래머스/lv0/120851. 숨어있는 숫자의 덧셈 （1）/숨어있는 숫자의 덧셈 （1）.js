function solution(my_string) {
    let answer = 0;
    my_string.split("").map(e => (e >= 0 && e <= 9) ? answer += Number(e) : 0)
    return answer;
}