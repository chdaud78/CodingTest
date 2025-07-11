## 문제1
### 문제
[프로그래머스 연습문제 LV1 같은 숫자는 싫어](https://school.programmers.co.kr/learn/courses/30/lessons/12906)

### 나의 문제 풀이

**첫번째 문제 풀이**
`filter` 함수를 통해 arr 배열 내 0번 index ~ 마지막 index까지 검사한다.
이때의 `value`는 현재 검사하는 값과 `arr[index +1](value 다음 번호의 값)`이 같지 않는 것(중복 x)을 filtering 한다.

**두번째 문제 풀이**
stack을 이용하여 arr 배열 내에서 `arr[i]` 와 `arr[i+1](arr[i] 다음 번호)`를 검사한다. 같지 않으면 stack에 push한다.

둘다 쉽게 말하면 앞번호의 값과 뒷 번호의 값이 같으면 무시하고 같지않으면 넣는 방식이다.

```js
// 배열 내장 함수를 이용한 풀이
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
```

### 피드백 내용

1. 스택 방식이 명확하고 직관적이다.

![](https://velog.velcdn.com/images/chdaud78/post/27d10931-6c2c-4816-b74c-380ae786b8e8/image.png)

2. ```arr[index+1]```의 마지막은 undefined가 된다.

![](https://velog.velcdn.com/images/chdaud78/post/5e7c1e6c-a570-412a-a17a-d38824bba1ba/image.png)

### 개선 후
```js
// 배열 내장 함수를 이용한 풀이
function solution(arr) {
   return arr.filter((value, index) => value !== arr[index - 1]);
}
```
### 팀원 코드 및 알게된 점
```js
// 민제님 풀이
const solution = (arr) => arr.filter((num, idx) => num !== arr[idx - 1]);

// 원형님 풀이
function solution(arr){
   var answer = [];
   for (let i = 0; i < arr.length; i++) {
      if (answer.length === 0 || answer[answer.length - 1] !== arr[i]) {
         answer.push(arr[i]);
      }
   }
   return answer;
}
```
원형님의 풀이는 `answer[answer.length-1](answer를 stack이라고 하면 answer에 푸쉬된 값)이 arr[i]`과 같지 않으면 answer에 push한다. answer에 넣고 answer와 arr을 비교하는 방식을 생각하지는 못했는데 좋은 방식인 것 같다.

## 문제2
### 문제
[프로그래머스 연습문제 LV2 올바른 괄호](https://school.programmers.co.kr/learn/courses/30/lessons/12909)

### 나의 문제 풀이

**첫번째 문제 풀이**
`s[i]`에서 '('가 존재하면 cnt를 늘려준다. 반대로 ')'가 존재하면 `cnt`를 빼준다.
이런 방식으로 한다면 `cnt`는 스택느낌으로 `push`와 `pop`을 한다. 즉, `cnt===0`이어야
올바른 괄호가 된다.
여기서 주의할 점은 `cnt`가 0이하가 되면 '(' 와 ')'가 만나서 사라지지 않고 ')'만 남은 것이므로 break 해준다.(그러면 cnt가 0이 아니므로 false를 return 한다.)

**두번째 문제 풀이**
cnt의 방식을 stack으로 만들었다. 같은 방식이라 생각해도 무관하다.
여기서 주의 할 점은 `stack.length`가 0이되면  ')'만 남은 것이므로 `return false` 해준다.

```js

// cnt를 이용하여 푸는 방법
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
```
### 피드백 내용

1. 두 코드 다 각각의 장점이 있다.

![](https://velog.velcdn.com/images/chdaud78/post/b26c7608-b609-4073-9dd3-1808b9b5bacf/image.png)

2. push(boolean 타입)과 같이 작성이 가능하다.

![](https://velog.velcdn.com/images/chdaud78/post/86e4f41f-b878-4e63-b368-1b01cbc5183a/image.png)

### 개선 후
stack에서 length가 0이되느냐 안되느냐가 중요하므로 `s[i]`자체를 넣을 필요가 없다.
```js
function solution(s){
  let stack = [];
  
  for(char of s) {
     if(char === '(') stack.push(true);
      else {
      if(stack.length === 0) return false;
      stack.pop();
    }
  }
  
  return stack.length === 0;
}
```
### 팀원 코드 및 알게된 점
```js
// 민제님 코드
function solution(s) {
  let count = 0;

  for (const char of s) {
    count += char === '(' ? 1 : -1;
    if (count < 0) return false;
  }

  return count === 0;
}
// 민제님 코드2
function solution(s) {
  const stack = [];

  for (const char of s) {
    if (char === '(') {
      stack.push(char);
    } else {
      if (stack.length === 0) return false;
      stack.pop();
    }
  }

  return stack.length === 0;
}

// 원형님 코드
function solution(s) {
    const answer = [];

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (char === '(') {
            answer.push(char);
        } else { // char === ')'
            if (answer.length === 0) {
                return false;
            }
            answer.pop();
        }
    }

    return answer.length === 0;
}
```
민제님 코드를 보면 `for~of` 함수를 이용하였다. index 자체를 쓸일이 없으면 `for~of` 사용하면 더 효율적인 것을 알게되었다.

## 문제3
### 문제
[프로그래머스 연습문제 LV2 주식가격](https://school.programmers.co.kr/learn/courses/30/lessons/42584)

### 나의 문제 풀이
이중 for문을 활용하여 `prices[i] <= prices[j]`(시세가 떨어지지 않는) 경우 해당 index의 answer를 1 늘려준다.
`pices[i] > prices[j]` (시세가 떨어지는 경우)에는 break를 통해 for문(내부)을 중단하고 다음 번호(외부 i)로 넘어가 검사한다.

```js
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
```
### 피드백 내용

1. 시간 복잡도 개선

![](https://velog.velcdn.com/images/chdaud78/post/24883f36-1b92-45d0-b1a0-58241f2e83f2/image.png)

![](https://velog.velcdn.com/images/chdaud78/post/27b85119-2168-4d47-8544-4b0db570ad23/image.png)

### 개선 후
방식은 다음과 같다.
1. 현재 주식보다 이전 주식의 가격이 높으면 이전 주식의 길이를 확정
2. 이전 주식들을 보고 현재 주식가격 보다 큰 주식 가격이 있다면 그 주식의 길이를 확정
3. 확정한 주식은 이후 계산에서 제외
   -> 연산 줄이기

최근 주식부터 그 이전으로 거슬러 올라가며 비교하므로 스택을 사용하고, 더이상 고려하지 않을 주식(길이를 확정한 주식)은 팝하면 된다. 그럼 스택에 남는 원소는 길이를 확정하지 않은 = 가격이 끝까지 떨어지지 않은 주식이다.

```js 
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
```

### 코드 및 알게된 점
```js
// 민제님 풀이
function solution(prices) {
   // 가격이 동일하거나 올라가면 계속 유지, 떨어지면 그 시점까지의 시간만 유지
   const answer = new Array(prices.length).fill(0);
   const stack = []; // 가격 떨어진 인덱스 저장

   prices.forEach((price, i) => {
      // 가격이 떨어진 경우~
      while (stack.length && price < prices[stack.at(-1)]) {
         const idx = stack.pop();
         answer[idx] = i - idx;
      }
      stack.push(i);
   });

   // 방안 1
   // stack.forEach(i => answer[i] = prices.length - 1 - i);

   // 방안 2
   while (stack.length) {
      const idx = stack.pop();
      answer[idx] = prices.length - 1 - idx;
   }
   return answer;
}

// 원형님 풀이
function solution(prices) {
   const answer = Array(prices.length).fill(0);
   const stack = [];

   for (let i = 0; i < prices.length; i++) {
      while (stack.length && prices[i] < prices[stack[stack.length - 1]]) {
         const top = stack.pop();
         answer[top] = i - top;
      }
      stack.push(i);
   }

   while (stack.length) {
      const top = stack.pop();
      answer[top] = prices.length - 1 - top;
   }

   return answer;
}
```

시간 복잡도를 고려하여 만들어야 한다. 알고리즘의 효율을 높이기 위해서는 연산 횟수를 줄이는 것이 기본이다. 나는 O(N^2)이지만 두 분의 코드는 O(N)으로 연산횟수를 줄였다. 특히, 민제님의 경우 forEach를 사용해 코드를 간결하게 작성하였다. forEach를 사용하면 for문 보다 더 가독성이 좋게 작성할수 있음을 알게 되었다. 또한 at을 사용하였다. at은 배열의 끝에서부터 -1씩 줄어들수록 시작을 가르키는 배열이다.