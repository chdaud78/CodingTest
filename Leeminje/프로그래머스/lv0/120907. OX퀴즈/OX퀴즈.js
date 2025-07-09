const solution = quiz => {
    let answer = [];
    
    quiz.forEach(e => {
        let [num1, operator1, num2, operator2, result] = e.split(" ");
        let total = operator1==="+" ? Number(num1)+Number(num2) : Number(num1)-Number(num2);
        
        answer.push(total===Number(result)?"O":"X");
    });
    
    return answer;    
}
