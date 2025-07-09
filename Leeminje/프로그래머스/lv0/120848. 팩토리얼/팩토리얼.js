const solution =  n => {
    let num = 1;
    let answer = 0;
    while (num <= n) num *= ++answer;
    return answer - 1;
}
