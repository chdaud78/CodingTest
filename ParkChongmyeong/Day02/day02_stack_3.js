function solution(prices) {
  let answer = new Array(prices.length).fill(0);

  for(let i = 0 ; i < prices.length; i++) {
    for(let j=i+1 ; j <prices.length; j++) {
      answer[i]++;
      if(prices[i] > prices[j]) break;
    }
  }

  return answer;
}

//개선 후
function solution(prices) {
  const n = prices.length;
  let answer = new Array(n).fill(0); // 가격이 떨어지지 않은 기간을 저장할 배열

  // 스택을 사용해 이전 가격과 현재 가격을 비교
  const stack = [0];
  for(let i = 0 ; i < n; i++) {
    // stack.length -1 : stack의 마지막 인덱스(들어온 주식)
    // stack[stack.length -1] : stack의 마지막 인덱스의 값(마지막에 들어온 prices의 i값, 즉 이전 주식)
    // prices[i] < prices[stack[stack.length -1]] : 이전 주식의 값 < 현재 주식
    while (stack.length > 0 && prices[i] < prices[stack[stack.length -1 ]]) {
      // 가격이 떨어졌으므로 이전 가격의 기간을 계산
      const j = stack.pop(); // 바로 이전 주식 index pop;
      answer[j] = i-j; // 이전 주식의 index의 값은 i-j(i는 현재, j는 이전)
      // 이 방식을 반복하여 현재 이전의 큰 주식들을 하나씩 팝하고 값을 저장
    }
    // while에 해당하지 않으면 stack에 push
    stack.push(i);
  }

  // 스택에 남아 있는 가격들은 가격이 떨어지지 않은 경우
  while(stack.length > 0) {
    const j = stack.pop();
    // answer[j] 가격이 떨어지지 않은 경우의 주식 n-1-j(전체 - j)
    answer[j] = n-1-j;
  }

  return answer;
}