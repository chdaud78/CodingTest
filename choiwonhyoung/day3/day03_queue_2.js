function solution(priorities, location) {
    let queue = priorities.map((priority, num) => ({num, priority}));
    let count = 0;
    
    while(queue.length>0){
        const current = queue.shift();
        
        const first = queue.some(doc => doc.priority > current.priority);
        
        if(first){
            queue.push(current);
        } else {
            count++;
            if(current.num === location){
                return count;
            }
        }
    }
}