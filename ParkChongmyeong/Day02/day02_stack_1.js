function solution(arr) {
  return arr.filter((value, index) => value !== arr[index + 1]);
}

// stack으로 푼 방식
function solution(arr) {
  let stack = [];

  for(let i = 0 ; i < arr.length; i++) {
    if(arr[i] !== arr[i+1]) stack.push(arr[i]);
  }

  return stack;
}