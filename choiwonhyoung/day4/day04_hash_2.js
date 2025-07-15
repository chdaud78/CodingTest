function solution(nums) {
    const map = new Map();
    for(let num of nums){
        map.set(num,(map.get(num)||0)+1);
    }
    const kinds = map.size
    const Max = nums.length/2;
    return Math.min(kinds,Max)
}

 
// function solution(nums) {
//     const Max = nums.length / 2;
//     const kinds = new Set(nums).size;
//     return Math.min(Max, kinds);
// }