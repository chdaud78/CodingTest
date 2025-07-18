## 문제1
### 문제
[코딩테스트 연습문제 LV2 기능개발](https://school.programmers.co.kr/learn/courses/30/lessons/42586)

### 나의 문제 풀이
앞 작업일이 끝나기 전까지 뒤 작업일은 시작을 못한다. 그러므로 max값(비교하는 값중 가장 큰 값)이 뒷 작업일 보다 걸리는 시간이 길면 cnt를 증가시키는 방식으로 코드를 짰다.
만약 반대로 max값이 작으면 앞 작업일 완료 후 뒤작업일을 하므로 배포를 바로 해버리므로 초기화해준다.

**로직**

1. 개발에 걸리는 시간 구하기
2. 현재 작업일이 이전 기준일 보다 작거나 같으면 cnt 증가
3. 그렇지 않다면 cnt를 answer에 추가, 새 기준일을 갱신

**풀이 과정 설명**

1. 개발에 걸리는 시간 계산
   `let queue = progresses.map((x,i) => Math.ceil((100-x)/speeds[i]));`
   우선 `map`함수를 통해 `(100-x)` 남은 작업을 `speeds[i]`속도로 나누면 개발에 걸리는 총 시간들이 나온다.
   ex) 예제에서는 `[ 7, 3, 9 ]` 이다. (7일, 3일, 9일)

2. 처음 `max`값을 `queue[0]` (기준 일을 첫 기능의 완료일)로 초기화, `cnt=1` (배포될 기능의 수)로 초기화한다.

3. `max`값이 `queue[i]` 보다 크거나 같으면 `queue[i]`(그 다음 기능)은 작업을 할 수 없는 상태이므로 cnt를 증가시켜 준다.

4. 만약 반대라면, 이전 작업이 끝나고 그 다음 작업을 할 수 있는 상태이므로 증가시킨 cnt를 answer에 push해준 뒤 max 값을 해당 i로 바꾼다.

5. 정답을 return 해준다

```js
function solution(progresses, speeds) {
  let answer = [];

  // 개발 남은 속도 / 속도 = 개발에 걸리는 시간
  let queue = progresses.map((x,i) => Math.ceil((100-x)/speeds[i]));
  // queue 이후 더 큰 값을 찾기 위한 임시 변수
  let tmpMax = queue[0]
  let cnt = 1;

  // queue[0]를 건너뛴 부분 부터 시작(첫번째는 무조건 실행해야하므로)
  for(let i = 1 ; i <= queue.length ; i++) {
    if(queue[i] <= tmpMax) {
      cnt++;
    } else {
      answer.push(cnt);
      tmpMax = queue[i];
      cnt= 1;
    }
  }

  return answer;
}
```
### 피드백 내용

1. 👍

![](https://velog.velcdn.com/images/chdaud78/post/cd1254ba-1a8f-491e-8b8e-592d5ab86568/image.png)

2. const 선언

![](https://velog.velcdn.com/images/chdaud78/post/5a530a1b-8051-4ea7-adc4-f689f87b80d3/image.png)

3. 반복문 종료 범위 조건 확인

![](https://velog.velcdn.com/images/chdaud78/post/8d8b8a65-a27c-4534-b4e1-25b8fa143974/image.png)


### 개선 후

변하지 않는 값들은 let 대신 const로 변경하였다. 값의 재할당을 막고 코드의 의도를 명확히 표현하기 위해 const를 사용한다고 한다.

이후 범위 초과하는 조건을 변경하였다. 범위를 변경하면 마지막 배포 묶음은 push하지 않기 때문에 마지막 배포 묶음을 push하는 코드를 추가하였다.

```js
function solution(progresses, speeds) {
  // 변하지 않는 값은 const로 변경
  const answer = [];
  const queue = progresses.map((x,i) => Math.ceil((100-x)/speeds[i]));
  
  let tmpMax = queue[0]
  let cnt = 1;

  // 범위 초과하는 조건 변경 (<= 에서 < 로 변경)
   for(let i = 0 ; i < queue.length ; i++) {
    if(queue[i] <= tmpMax) {
      cnt++;
    } else {
      answer.push(cnt);
      tmpMax = queue[i];
      cnt= 1;
    }
  }
   
  // 마지막 배포 묶음 push하기
  if (cnt > 0) answer.push(cnt);

  return answer;
}
```

### 팀원 코드 및 알게된 점

**원형님 코드**

```js
function solution(progresses, speeds) {
    var answer = [];

    const days = progresses.map((progress, i)=>Math.ceil((100-progress)/speeds[i]));

    let end = days[0];
    let pro = 0;

    for(let i=0;i<days.length;i++){
        if(days[i]<=end){
            pro++;
        }else{
            answer.push(pro);
            end = days[i];
            pro =1;
        }
    }

    answer.push(pro)
    return answer;
}
```

**민제님 코드**

```js
function solution(progresses, speeds) {
  const answer = [];
  // 현재 배포 그룹의 기준일, 현재 배포 그룹일 기준일 기준 계산 날짜
  let [currentDay, count] = [0, 0];

  // 0️⃣ 왜 forEach를 두고 for를 사용했는가?
  for (let i = 0; i < progresses.length; i++) {
    // 1️⃣ 각 기능마다 필요한 날짜 계산
    const remain = 100 - progresses[i];
    const day = ~~((remain + speeds[i] - 1) / speeds[i]);
    // const day = Math.ceil(remain / speeds[i]);

    // 2️⃣ 큐처럼 순서대로 비교하며 묶기
    if (day <= currentDay) {
      count++;
    } else {
      if (count > 0) answer.push(count);
      currentDay = day;
      count = 1;
    }
  }

  // 마지막 배포 그룹 처리
  answer.push(count);
  return answer;
}
```
민제님 코드를 통해

1. 구조 할당 방식
   `let [currentDay, count] = [0, 0];`를 이용하여 코드를 간결하게 적을 수 있다.

2. double tilde 연산자
   `const day = ~~((remain + speeds[i] - 1) / speeds[i]);`
   ~~는 정수 표현식으로 소수점을 버린다. Math.ceil 대신 사용한 표현식인 것 같다.
   민제님 덕분에 처음 알게된 연산자이다.

## 문제2
### 문제
[프로그래머스 연습문제 LV2 프로세스](https://school.programmers.co.kr/learn/courses/30/lessons/42587)

### 나의 문제 풀이
문제에서 주어진 로직으로 풀면 간단하다.

**로직**

1. 큐에서 enqueue와 dequeue를 하면 index는 변경 되므로 처음 각각의 고유 위치를 저장한다.
2. 큐에서 프로세스를 꺼낸다.
3. 꺼낸 프로세스와 큐를 비교한다.
   3-1. 더 높은 수가 있으면 다시 넣는다.
   3-2. 그렇지 않다면 실행 횟수를 늘려준다.
4. 실행 횟수를 return한다.

**풀이 과정 설명**

1. map 함수를 이용하여 고유 위치를 저장
   `let mapPriorities = priorities.map((x,i) => [i,x]);`
   ex) `mapPriorities = [ [ 0, 2 ], [ 1, 1 ], [ 2, 3 ], [ 3, 2 ] ]`

2. shift를 통해 dequeue 하기
   `let tmp = mapPriorities.shift();`

3. some 함수를 통해 꺼낸 프로세스보다 더 큰 수가 있는지 확인하기
   `mapPriorities.some((x) => x[1] > tmp[1])`

3-1. 있으면 push를 통해 다시 enqueue하기
`mapPriorities.push(tmp);`

3-2. 없으면 실행 횟수 증가시키고 push는 하지 않기(이미 실행 했으므로 완전히 빠져야 한다.)
`answer++;`

3-3. 실행된 문서가 내가 찾던 location이면 몇 번째인지 return
`if(tmp[0] === location) return answer;`

```js
function solution(priorities, location) {
  let answer = 0;
  let mapPriorities = priorities.map((x,i) => [i,x]);

  while(mapPriorities.length > 0) {
    let tmp = mapPriorities.shift();
    if(mapPriorities.some((x) => x[1] > tmp[1])) {
      mapPriorities.push(tmp);
    }
    else {
      answer++;
      if(tmp[0] === location) return answer;
    }
  }
  return answer;
}
```

### 피드백 내용

1. 변하지 않는 값에는 const 선언하기 & 👍

![](https://velog.velcdn.com/images/chdaud78/post/48d7f297-7cff-45a3-9d90-cd8bb4ddef90/image.png)

2. 변하지 않는 값에는 const 선언하기

![](https://velog.velcdn.com/images/chdaud78/post/45a5ce26-a338-49c8-82fd-c1264206fc56/image.png)

3. 분기문 내에서는 조건 비교 외의 연산 들어가지 않기

![](https://velog.velcdn.com/images/chdaud78/post/1fb58244-48e9-4596-b3a3-89fee6ede093/image.png)

### 개선 후

변하는 값 answer, tmp를 제외하고 변하지 않는 값은 const로 고쳤다.

이후 `if(mapPriorities.some((x) => x[1] > tmp[1]))`의 분기문 안에 비교 연산이 아닌 배열 탐색과 람다식이 들어가 있다.
이렇게 하면 가독성이 떨어지고, 디버깅과 재사용성, 유지보수가 어려워지므로 고쳐야한다.
이를 아래와 같이 고쳤다.

```js
const check = mapPriorities.some((x) => x[1] > tmp[1]);
if(check);
```

**최종 코드**
```js
function solution(priorities, location) {
  let answer = 0;
  const mapPriorities = priorities.map((x,i) => [i,x]);

  while(mapPriorities.length > 0) {
    let tmp = mapPriorities.shift();
    const check = mapPriorities.some((x) => x[1] > tmp[1])
    
    if(check) {
      mapPriorities.push(tmp);
    }
    else {
      answer++;
      if(tmp[0] === location) return answer;
    }
  }
  return answer;
}
```

### 코드 및 알게된 점

**원형님 코드**
```js
function solution(priorities, location) {
    let queue = priorities.map((priority, num) => ({num, priority}));
    let count = 0;
    
    while(queue.length>0){
        const current = queue.shift();
        
        const first = queue.some(doc => doc.priority > current.priority);
        
        if(first){
            queue.push(current);
        } else {
            count++;
            if(current.num === location){
                return count;
            }
        }
    }
}
```

**민제님 코드**

```js
function solution(priorities, location) {
  const queue = priorities.map((priority, index) => ({ index, priority }));
  let count = 0;

  while (queue.length) {
    const current = queue.shift();
    const maxPriority = Math.max(...queue.map((item) => item.priority));

    if (current.priority < maxPriority) {
      queue.push(current);
    } else {
      count++;
      if (current.index === location) return count;
    }
  }
}
```

민제님은 some 대신 Math.max를 사용하였다. Math.max 사용하면 더 직관적이고 안정적이다. map과 Math.max 자체를 쓰는 것은 성능이 조금 더 무거워 질 수 있다는 단점도 있다. 그래서 상황에 따라 잘 선택하여 사용해야한다.

## 문제3
### 문제
[프로그래머스 연습문제 LV2 다리를 지나는 트럭](https://school.programmers.co.kr/learn/courses/30/lessons/42583)

### 나의 문제 풀이

**로직**

1. 다리를 큐로 표현하고 다리의 길이만큼 배열을 만든다.
2. 매 시간마다 트럭이 한 칸씩 전진한다.
3. 다음 트럭이 다리에 진입 가능한지 확인한다.
   3-1. 현재 다리 위 무게 총합 + 다음 트럭의 무게 <= 제한무게 이면 진입
   3-2. 그렇지 않다면 0을  넣어 트럭 없이 시간만 흐르게 한다.
4. 트럭이 모두 지나갈 때까지 시간을 증가시키며 시뮬레이션한다.
5. 총 걸린 시간을 반환한다.

**풀이 과정 설명**

1. 다리를 큐로 표현하고 길이만큼 배열을 만든다.
   `let bridge = Array(bridge_length).fill(0);`

2. 매 시간마다 시간을 증가시킨다.
   `time++;`

3. 맨 앞 트럭이 다리에서 내려간다.
```js
const leftTruck = bridge.shift();
bridgeWeight -= leftTruck;
```

4. 다음 트럭이 인집 가능한지 확인한다.
```js
const nextTruck = truck_weights[0];
if (nextTruck && bridgeWeight + nextTruck <= weight)
```

4-1. 진입 가능하면 bridge에 다음 트럭을 저장하고 다리 위 총 무게를 추가해 준다.
```js
bridge.push(nextTruck);
bridgeWeight += nextTruck;
truck_weights.shift();
```

4-2. 진입 불가능하면 bridge에 0을 넣는다.(아무것도 안 올라감을 의미)
`bridge.push(0);`

5. 최종 시간을 return 한다.
   `return time;`

```js
function solution(bridge_length, weight, truck_weights) {
  let time = 0;
  let bridge = Array(bridge_length).fill(0); // 다리를 나타내는 큐
  let bridgeWeight = 0; // 다리 위 총 무게

  while (truck_weights.length > 0 || bridgeWeight > 0) {
    time++;

    // 1. 한 칸 전진 (맨 앞 트럭이 다리에서 내려감)
    const leftTruck = bridge.shift();
    bridgeWeight -= leftTruck;

    // 2. 다음 트럭을 올릴 수 있으면 올림
    const nextTruck = truck_weights[0];
    if (nextTruck && bridgeWeight + nextTruck <= weight) {
      bridge.push(nextTruck);
      bridgeWeight += nextTruck;
      truck_weights.shift();
    } else {
      bridge.push(0); // 아무 트럭도 못 올림
    }
  }

  return time;
}
```
### 피드백 내용
1. 👍
   ![](https://velog.velcdn.com/images/chdaud78/post/364d2742-97f1-4ba5-93aa-f0429d8973b8/image.png)

### 코드 및 알게된 점
**원형님 코드**
```js
function solution(bridge_length, weight, truck_weights) {
    let time =0;
    let bridge =[];
    let total=0;
    
    while (truck_weights.length>0||bridge.length>0){
        time++;
        if(bridge.length>0 && time - bridge[0].time>=bridge_length){
            total -= bridge[0].weight;
            bridge.shift();
        }
        
        if(
            truck_weights.length >0 &&
            total + truck_weights[0] <= weight
        ){
            const truck = {
                weight: truck_weights.shift(),
                time: time
            };
            bridge.push(truck);
            total +=truck.weight;
        }
        
    }
    
    return time;
}
```
각 트럭의 진입 시점을 객체에 담아서 관리한다. 시간이 흐를 때마다 time - 진입시간 >= 다리길이 조건으로 출발 트럭 제거한다.
상태추적이 명확하고 유지보수에 좋은 코드인 것 같다.

**민제님 코드**
```js
// 기존 코드 (최적화 진행)
function solution(bridge_length, weight, truck_weights) {
  const bridgeQueue = Array(bridge_length).fill(0);
  let completeTime = 0;
  let sumTruckWeight = 0;

  while (truck_weights.length || sumTruckWeight) {
    completeTime++;

    const outTruck = bridgeQueue.shift();
    sumTruckWeight -= outTruck;

    const nextTruck = truck_weights[0];
    // 1️⃣ canEnter 조건을 한 줄로 작성
    const canEnter = nextTruck !== undefined && sumTruckWeight + nextTruck <= weight;

    // 2️⃣ 트럭 진입을 한 줄로 처리
    const enteringTruck = canEnter ? truck_weights.shift() : 0;
    bridgeQueue.push(enteringTruck);

    sumTruckWeight += enteringTruck;
  }

  return completeTime;
}
```

canEnter라는 불리언 변수를 사용해 조건식 분리를 하여 가독성을 높였다.