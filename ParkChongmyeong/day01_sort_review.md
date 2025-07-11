## 문제1
### 문제
[프로그래머스 연습문제 Level1 K번째 수](https://school.programmers.co.kr/learn/courses/30/lessons/42748)

### 나의 문제 풀이
나의 문제 풀이는 간단하다.
1. array를 i번째 (```commands[i][0] -1```) ~ j번째 (```commands[i][1]```)로 나눈다.
2. 나눈 배열을 정렬한다.
3. 정렬한 배열에서 k번째 값을 추출하여 answer에 추가한다.

```js
//[
//     [2, 5, 3], 
//     [4, 4, 1], 
//     [1, 7, 3]
// ]

function solution(array, commands) {
    var answer = [];
    
    for(var i = 0; i < commands.length; i++) {
        var test = [];
        test = array.slice(commands[i][0]-1, commands[i][1]);
        test.sort((a,b) => a-b);
        answer.push(test[commands[i][2]-1]);
    }
    
    return answer;
}
```

### 피드백 내용
1. 선언과 할당 함께 하기, 변수명 test 고치기
2. 가독성 높이기
4. var 이외의 let과 const 사용하기


### 개선 후
```js
function solution(array, commands) {
    const answer = commands.map((x) => {
        return array.slice(x[0]-1, x[1]).sort((a,b) => a-b)[x[2]-1];
    });
    
    return answer;
}
```
팀원의 조언대로 var를 사용하지 않고 const나 let을 이용하였고, 구조개선을 위해 for문을 삭제하고 map을 활용하였다. 기존코드보다 간결하지만 직관적이진 않다고 생각했다. js를 잘 아는 사람에겐 더 직관적일 수도 있다고 생각한다.

### 코드 및 알게된 점
```js
const solution = (array, commands) =>
  commands.map(([i, j, k]) => {
    const subArray = array.slice(i - 1, j);
    if (subArray.length === 1) return subArray[0];
    return subArray.sort((a, b) => a - b)[k - 1];
  });
```

```map()``` 함수 내부에서 매개변수를 구조 분해 할당으로 바로 사용하는 방식을 새롭게 알게 되었다. 문제에 맞게 ```[i,j,k]```로 꺼내쓰는 것을 보고 구조 분해가 이렇게도 활용할 수 있음을 알게 되었다.
또한 문제 요구사항에는 없지만 추후 범용성을 고려하여 예외처리도 추가하였다. 이러한 습관은 문제 발생을 방지하는 좋은 습관이라고 생각한다.

## 문제2
### 문제
[프로그래머스 LV2 가장 큰 수](https://school.programmers.co.kr/learn/courses/30/lessons/42746)

### 나의 문제 풀이
나의 문제풀이는 문제에 제시한 내용 그대로 풀었다.
1. numbers를 string으로 변경
2. 더 큰수 찾기 (ex. '30'(a)과 '3'(b) 비교시 '330'(b+a) vs '303'(a+b), '330'이 더 크므로 3이 앞에온다.)
3. 예외처리(모든 수가 0이면 '0000..'이 아니라 '0'이 와야하므로 예외)
4. reduce를 이용해 값 합치기

```js
function solution(numbers) {
    var answer = '';
    for(let i = 0 ; i < numbers.length ; i++) {
        numbers[i] = numbers[i].toString();
    }
    numbers.sort((a,b) => (b+a)-(a+b));
    if(numbers[0] == '0') answer = '0';
    else answer = numbers.reduce((acc,i) => acc + i);
    return answer;
}
```

### 피드백 내용
1. sort 숫자비교와 문자비교의 차이를 인지하기

### 개선
```js
function solution(numbers) {
  const strs = numbers.map(String);
  strs.sort((a, b) => (b + a).localeCompare(a + b));
  if (strs[0] === '0') return '0';
  return strs.join('');
}
```
팀원이 설명해준 localCompare를 이용하였다. 위에서 받은 피드백으로 for문을 지우고 map으로 string을 만들어 준뒤 ```(b+a)localeCompare(a+b)```로 정렬한다. 이후 reduce 대신 join을 통해 문자를 합친다.

```(b+a)localeCompare(a+b)```을 간단하게 설명하자면 ```localecompare```은 문자열끼리 사전순 비교를 해주는 메서드입니다.
```a='3' b='30'이라고 하면 a+b = '330' , b+a='303'```이다.
```(b+a)localeCompare(a+b)``` = ```330```vs```303```으로 해석하면 편하다.
```330```이 ```303```보다 사전적으로 뒤에 있으므로 a+b가 b+a보다 크다는 해석이된다. 즉 a+b가 더 크므로 a가 먼저와야한다.
앞서 ```(b+a) - (a+b)``` 대신 ```localecompare```을 사용한 이유는 JS는 ```(b+a) - (a+b)```즉 빼기 연산을 숫자로 암묵적 형변환을 한다. ```localecompare```은 문자열 비교 전용 함수로 유니코드, 국제화에 안정적으로 동작하므로 안정성에서 좋다.

reduce 대신 ```join```을 쓴 이유는 가독성도 높일 수 있고 성능도 개선시킬수 있다. ```join```은 내부적으로 문자열 길이를 미리 계산하여 한 번에 메모리를 할당하고 이어 붙이고,
```reduce```는 문자열을 누적하면서 새로운 문자열을 만들기 때문에 상대적으로 느릴 수 있다.

### 스터디원 코드 및 알게된 점
```js
function solution(numbers) {
  const answer = numbers
    .map(String)
    .sort((a, b) => (b + a).localeCompare(a + b))
    .join('');

  return answer[0] === '0' ? '0' : answer;
}
```
팀원은 for문을 최대한 배제하고 map함수를 사용하려고 노력한다. 이러한 점은 의도 전달, 가독성, 함수형 스타일의 장점이 있어 좋은 습관이라고 느꼈다.
또한 localeCompare라는 문자열 비교를 알게 되었다. 어떠한 차이점이 있고 안정성도 생각하는 코드를 적어야함을 깨달았다.
팀원의 코드에서 join을 보고 reduce와 join의 차이를 공부하게 되었다.
삼항 연산자를 사용하여 return하는 방식 또한 간결하게 처리하여 좋은 방식인 것 같다.

## 문제3
### 문제
[프로그래머스 LV2 H-Index](https://school.programmers.co.kr/learn/courses/30/lessons/42747)

### 나의 문제 풀이
1. 인용 횟수를 내림차순으로 정렬하고
2. 인덱스 i일 때, citations[i] >= i+1 조건을 만족하면 answer = i+1 할당
3. 이것을 반복하며 H-index를 갱신한다.

```js
function solution(citations) {
    var answer = 0;
    
    citations.sort((a,b) => b-a);
    
    for(let i = 0 ; i <= citations.length ; i++) {
        if(citations[i] >= i+1) answer = i+1;
    }
    
    return answer;
}
```

### 피드백 내용
1. for문 범위 오류 고치기
2. 예외 처리하기

### 개선
```js
function solution(citations) {
  citations.sort((a, b) => b - a);

  for (let i = 0; i < citations.length; i++) {
    if (citations[i] < i + 1) return i;
  }

  return citations.length;
}
```

인용수를 큰 것 부터 정렬한다. 그 이유는 인용 수가 높은 논문부터 차례대로 확인하면서, 몇 개가 그만큼 인용되었는지 확인하기 위해서이다.

i + 1은 현재까지 논문 갯수이다. (index가 0부터 이므로 논문은 i+1편째이다)
citataions[i]는 그 중에서 인용 수가 가장 적은 논문이다.

![](https://velog.velcdn.com/images/chdaud78/post/4d3d9455-01ee-4714-bb5b-190faab645fb/image.png)

위 예시를 보면 4번째 논문 즉 4에서 citations[i]가 i+1보다 작아지므로 그 때의 i가 최대 h인 것이다. 그러므로 return i를 해준다.

만약 끝까지 통과하면 전부 n번이상 인용되었으므로 citations.length가 최대 h인 것이다.

### 스터디원 코드 및알게된 점
```js
function solution(citations) {
  citations.sort((a, b) => b - a);

  const idx = citations.findIndex((item, i) => item < i + 1);
  return idx === -1 ? citations.length : idx;
}
```

스터디원이 나의 피드백을 받고 findIndex를 이용하여 풀었다. for문을 삭제하고 findIndex를 통해 특정 조건 citations[i] < i+1인 시점의 i를 idx로 넣어주었다.
이후 idx === -1이면 조건에 맞는 idx를 찾지 못하였으므로 citations.length가 된다.
js 함수를 이용하여 더 프론트엔드다운 코드인 것 같다.