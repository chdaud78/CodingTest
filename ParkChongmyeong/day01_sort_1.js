function solution(numbers) {
    var answer = '';
    
    for(let i = 0 ; i < numbers.length ; i++) {
        numbers[i] = numbers[i].toString();
    }
    
    numbers.sort((a,b) => (b+a) - (a+b));
    
    answer = numbers.reduce((acc,i) => acc + i);
    return answer;
}
