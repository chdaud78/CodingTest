function solution(array, n) {
    let min = 0;
    let arr = [];
    array.sort((a, b) => a - b).map((e, idx) => {
        if (e < n) arr[idx] = n - e;
        else arr[idx] = e - n;
    }) 
  
    min = Math.min(...arr);
    return array[arr.indexOf(min)];
}