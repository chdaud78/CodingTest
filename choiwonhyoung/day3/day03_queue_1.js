function solution(progresses, speeds) {
    var answer = [];
    
    const days = progresses.map((progress, i)=>Math.ceil((100-progress)/speeds[i]));
    
    let end = days[0];
    let pro = 0;
    
    for(let i=0;i<days.length;i++){
        if(days[i]<=end){
            pro++;
        }else{
            answer.push(pro);
            end = days[i];
            pro =1;
        }
    }
    
    answer.push(pro)
    return answer;
}