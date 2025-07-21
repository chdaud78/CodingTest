// 최소 직사각형
function solution(sizes) {
    let Width = 0;
    let Height = 0;
    
    for(let[w,h]of sizes){
        let [big, small]= w>h?[w,h]:[h,w];
        Width=Math.max(Width,big)
        Height=Math.max(Height,small)
    }
    return Width*Height;
}