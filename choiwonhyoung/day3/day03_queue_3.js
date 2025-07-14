function solution(bridge_length, weight, truck_weights) {
    let time =0;
    let bridge =[];
    let total=0;
    
    while (truck_weights.length>0||bridge.length>0){
        time++;
        if(bridge.length>0 && time - bridge[0].time>=bridge_length){
            total -= bridge[0].weight;
            bridge.shift();
        }
        
        if(
            truck_weights.length >0 &&
            total + truck_weights[0] <= weight
        ){
            const truck = {
                weight: truck_weights.shift(),
                time: time
            };
            bridge.push(truck);
            total +=truck.weight;
        }
        
    }
    
    return time;
}