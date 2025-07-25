function solution(routes) {
    routes.sort((a,b)=>a[1]-b[1]);
    let cameraCount=0;
    let cameraNow = -30000
    
    for (let i = 0; i < routes.length; i++) {
        const[start, exit]=routes[i];
        if(cameraNow<start){
            cameraCount++
            cameraNow=exit;
        }
    }
    return cameraCount;
}