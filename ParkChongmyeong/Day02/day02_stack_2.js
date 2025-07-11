function solution(s){
  let cnt = 0;

  for(let i = 0; i < s.length; i++) {
    if(s[i] === '(') cnt++;
    else cnt--;

    if(cnt < 0) break;
  }

  return cnt == 0;
}

// 스택으로 푼 방법
function solution(s){
  let stack = [];

  for(let i = 0; i < s.length; i++) {
    if(s[i] === '(') stack.push(s[i]);
    else {
      if(stack.length === 0) return false;
      stack.pop();
    }
  }

  return stack.length === 0;
}