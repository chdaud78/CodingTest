## 🎈문제1
### ✏️문제
[프로그래머스 연습문제 LV1 완주하지 못한 선수](https://school.programmers.co.kr/learn/courses/30/lessons/42576)

### ✏️나의 문제 풀이
**로직**

1. 참가자를 이름과 count로 object(해시)에 해싱한다.
2. 참가자가 존재하면 count +1해준다.(중복도 있으므로 계속 증가할 수 있음)
3. 완료자 목록에 존재하면 count -1 해준다.
4. value가 0이상이면 완료하지 못한 것이므로 그 key(이름)을 return한다.

**풀이 과정 설명**

1. 참가자를 이름과 `count`로 `object(해시)`에 해싱한다.
2. 참가자가 존재하면 `object`내 참가자의 `value`를 `+1`해준다.(중복도 있으므로 계속 증가할 수 있음 / 없으면 1로  초기화)
```js
// participant object에 추가
  for(const name of participant) {
    if(objectParticipant[name]) {
      // 이미 존재하면 +1
      objectParticipant[name] += 1;
    } else {
      // 없으면 1
      objectParticipant[name] = 1;
    }
  }
```
3. 완료자와 대조하여 완료자 목록에 존재하면 다시 `object`내 해당 참가자의 `value`를 `-1` 해준다.
```js
for(const name of completion) {
    objectParticipant[name] -= 1
  }
```

4. `value`가 0이상이면 완료하지 못한 것이므로 그 `key(이름)`을 return한다.
   `for~in` 함수를 사용하여 `object` 내의 `key`값을 가져온다.
   `key`값에 해당하는 `value`가 0이상이면 `key`를 return 해준다.

```js
for(const key in objectParticipant) {
    if(objectParticipant[key] > 0) return key
  }
```

**최종 코드**
```js
function solution(participant, completion) {
  let objectParticipant = {};

  // participant object에 추가
  for(const name of participant) {
    if(objectParticipant[name]) {
      // 이미 존재하면 +1
      objectParticipant[name] += 1;
    } else {
      // 없으면 1
      objectParticipant[name] = 1;
    }
  }

  // completion과 대조하여 있으면 -1 해주기
  for(const name of completion) {
    objectParticipant[name] -= 1
  }

  // 0이상이면 완주 못한 것이므로 key값(name) return
  for(const key in objectParticipant) {
    if(objectParticipant[key] > 0) return key
  }
}
```

### ✏️피드백 내용

1. 간결하게 처리

![](https://velog.velcdn.com/images/chdaud78/post/a3eaed0f-b73e-4f8e-8b6b-254f251e288c/image.png)


2. 👍

![](https://velog.velcdn.com/images/chdaud78/post/645619e3-1a71-4763-a8ac-a1835073b156/image.png)


### ✏️개선 후

논리 연산자를 이용하여 `if~else` 구문을 한 줄로 줄일 수 있었다.

```js
function solution(participant, completion) {
  let objectParticipant = {};

  // participant object에 추가
  for(const name of participant) {
    objectParticipant[name] = (objectParticipant[name] || 0) + 1
  }

  // completion과 대조하여 있으면 -1 해주기
  for(const name of completion) {
    objectParticipant[name] -= 1
  }

  // 0이상이면 완주 못한 것이므로 key값(name) return
  for(const key in objectParticipant) {
    if(objectParticipant[key] > 0) return key
  }
}
```
### ✏️팀원 코드 및 알게된 점
**민제님 코드**
```js
function solution(participant, completion) {
  const map = new Map(); // 이름 → 등장 횟수

  // 1️⃣ 참가자 수 카운팅
  participant.forEach((name) => map.set(name, (map.get(name) || 0) + 1));
  // 2️⃣ 완주자 수 차감
  completion.forEach((name) => map.set(name, map.get(name) - 1));
  // 3️⃣ 카운트가 남아 있는 사람이 완주 못한 사람
  for (const [name, count] of map.entries()) {
    if (count > 0) return name;
  }
}
```
js의 map 객체를 활용하여 만드셨다.
forEach문을 화살표 함수를 이용하여 간결하게 작성하신 점이 인상깊었다.

**원형님 코드**
```js
function solution(participant, completion) {
    const map = new Map();
    
    for(const name of participant){
        map.set(name,(map.get(name)|| 0) + 1);
    }
    
    for (const name of completion){
        map.set(name,map.get(name)-1);
    }
    
    for(let [name,count] of map){
        if(count>0) return name
    }
}
```
민제님과 코드가 유사하다.
`map.entries()`가 아닌 map 자체에서 구조분해하여 가져왔다. 민제님과 합치면 굉장히 간결하게 작성할 수 있을 것 같다.

## 🎈문제2
### ✏️문제
[프로그래머스 연습문제 LV1 폰켓몬](https://school.programmers.co.kr/learn/courses/30/lessons/1845)
### ✏️나의 문제 풀이
**로직**

1. 주어진 폰켓몬의 중복을 제거한다.
2. 중복 제거 배열이 N/2보다 크면 아무거나 골라도 다른 종류이므로 N/2를 리턴하면 된다.
3. N/2보다 작으면 중복 제거 배열 자체가 다른 종류가 되므로 최대 종류는 중복 제거한 배열의 크기가 된다.

**풀이 과정 설명**

1. `Set`을 이용하여 주어진 폰켓몬의 중복을 제거한다. `Set`은 순서없이 중복을 제거한 배열이라고 생각하면 편하다.
   `let setNums = [...new Set(nums)];`

2. 삼항 연산자를 이용하여 최대 수를 저장한다. `N/2`보다 크면 `N/2`를, 작으면 `setNums`의 크기를 return 한다.
   `setNums.length > N/2 ? answer = N/2 : answer = setNums.length;`

```js
function solution(nums) {
  let answer = 0;
  let N = nums.length;
  // 중복 제거
  let setNums = [...new Set(nums)];

  // 중복 제거한 폰켓몬의 수가 N/2 보다 크면 N/2 return
  // N/2보다 작으면 중복 제거한 폰켓몬의 수만큼 return
  setNums.length > N/2 ? answer = N/2 : answer = setNums.length;

  return answer
}
```
### ✏️피드백 내용

1. 미리 계산을 진행 하기(가독성 증가)

![](https://velog.velcdn.com/images/chdaud78/post/f2fa5e98-498e-455e-b280-9b1c3c2a5b08/image.png)

2. 가독성을 높이고, 간결하게 작성하기

![](https://velog.velcdn.com/images/chdaud78/post/43ae8175-6314-449a-a9ba-c0ccd6b5ebdd/image.png)

### ✏️개선 후

버전1. 민제님 개선 사항
`num.length/2`를 미리 계산하여 변수에 저장한 다음 이용한다.
삼항연사자를 이용하여 `answer`를 가져온다.

```js
function solution(nums) {
  let answer = 0;
  let halfN = nums.length / 2;
  // 중복 제거
  let setNums = [...new Set(nums)];

  // 중복 제거한 폰켓몬의 수가 N/2 보다 크면 N/2 return
  // N/2보다 작으면 중복 제거한 폰켓몬의 수만큼 return
  answer = setNums.length > halfN ? halfN : setNums.length;

  return answer
}
```

버전2. 원형님 개선 사항
삼항연산자를 사용하지않고 Math.max를 이용한다.
코드가 더 간결하고 변수의 수도 줄어들어 효율적인 것 같다.
```js
function solution(nums) {
  let halfN = nums.length / 2;
  
  // 중복 제거
  let setNums = [...new Set(nums)];

  // 중복 제거한 폰켓몬의 수가 N/2 보다 크면 N/2 return
  // N/2보다 작으면 중복 제거한 폰켓몬의 수만큼 return
  return Math.min(halfN, setNums.length)
}
```

### ✏️팀원 코드 및 알게된 점
**민제님 코드**
```js
// 기존코드
function solution(nums) {
  const max = nums.length / 2;
  const unique = new Set(nums).size;

  return Math.min(max, unique);
}
```
피드백에서 주신 것 처럼 num.length/2를 미리 계산하고 Set의 size를 이용해 폰켓몬의 종류를 찾으셨다. 또한 Math.min을 이용하여 간결하게 작성하셨다. 그로 인해 코드량이 줄고 가독성이 더 높아졌다.
코드를 간결하게 작성하려는 노력이 더 필요함을 느꼈다.

**원형님 코드**
```js
function solution(nums) {
    const map = new Map();
    for(let num of nums){
        map.set(num,(map.get(num)||0)+1);
    }
    const kinds = map.size
    const Max = nums.length/2;
    return Math.min(kinds,Max)
}
```
우리와는 다르게 map 객체를 이용하여 중복을 제거하였다. 이러한 방법도 다른 곳에서 쓰일 수 있으므로 알아놓으면 좋을 것 같다.

## 🎈문제3
### ✏️문제
[프로그래머스 연습문제 LV2 전화번호 목록](https://school.programmers.co.kr/learn/courses/30/lessons/42577)

### ✏️나의 문제 풀이
**로직**

1. 번호를 순서대로 정렬한다.
2. 순서대로 정렬한 상태에서 앞 번호가 뒷 번호의 접두어인지 확인한다.
3. 맞으면 `false`, 아니면 `true`를 리턴한다.

**풀이 과정 설명**

1. 지난번 피드백에서 받은 문자열 비교 함수 `localeCompare`를 이용하여 정렬해준다.
   `phone_book.sort((a,b) => a.localeCompare(b));`

2. 정렬을 하면 짧은 번호가 먼저 오고, 빠른 순서대로 정렬 되므로 앞과 뒤만 분석을 하면 된다.
   `if(phone_book[i+1].startsWith(phone_book[i])) return false;`
   이처럼 `startsWith` 함수를 사용하여 앞 번호가 뒷 번호에 포함되면 `false`를 return 한다.

3. for문을 끝까지 돌아도 return이 안되면 없는 것이므로 최종적으로 `true`를 return 한다.
```js
function solution(phone_book) {
  phone_book.sort((a,b) => a.localeCompare(b));

  for(let i = 0 ; i < phone_book.length-1 ; i++) {
    if(phone_book[i+1].startsWith(phone_book[i])) return false;
  }

  return true;
}
```

### ✏️피드백 내용

1. 👍

![](https://velog.velcdn.com/images/chdaud78/post/946ddea2-aadb-4ddf-8ddf-a9408d0826b7/image.png)

![](https://velog.velcdn.com/images/chdaud78/post/dd66437c-53f3-44dd-b84f-84aced841aba/image.png)

### ✏️팀원 코드 및 알게된 점
**민제님 코드**
```js
function solution(phone_book) {
  phone_book.sort();

  for (let i = 0; i < phone_book.length - 1; i++) {
    const curr = phone_book[i];
    const next = phone_book[i + 1];

    if (next.startsWith(curr)) {
      return false;
    }
  }

  return true;
}
```
나와 같은 방식으로 해결하셨다. 다만 앞에서 변수에 미리 저장한 후 비교하여 더 가독성을 높이셨다.

**원형님 코드**
```js
function solution(phone_book) {
    const set = new Set(phone_book)
        for (let number of phone_book) {
            for(let i = 1; i < number.length; i++){
                const text = number.slice(0,i);
                if(set.has(text)){
                    return false;
                }
            }
        }
    return true;
}
```

이중 for문을 사용하셨다. 로직 자체는 괜찮아 보이지만 시간복잡도 효율이 안좋은 것 같다.
set을 이용하여 문제를 푸신 점은 좋은 것 같다.