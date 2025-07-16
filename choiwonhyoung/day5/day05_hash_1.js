function solution(clothes) {
    const map=new Map();
    
    for(let[item,type]of clothes){
        if(!map.has(type)){
            map.set(type,[]);
        }
        map.get(type).push(item);
    }
    
    let mix = 1;
    for(let item of map.values()){
        mix *= (item.length + 1);
    }
    
    return mix - 1;
}