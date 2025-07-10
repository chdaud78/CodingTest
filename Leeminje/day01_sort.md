# 📚 정렬(Sort) 문제 풀이

정렬 알고리즘을 활용해 풀 수 있는 대표적인 코딩테스트 문제들을 모아 정리했습니다.<br/>
각 문제는 <b>기본 풀이 → 개선 아이디어</b> 순서로 구성되어 있습니다.

### 1️⃣ K번째수(프로그래머스 Level 1)

> 배열의 특정 구간을 자르고 정렬한 후, K번째 수를 구하는 문제

✅ 기본 풀이

```javascript
function solution(numbers) {
  const answer = numbers
    .map(String)
    .sort((a, b) => (b + a).localeCompare(a + b))
    .join('');

  return answer[0] === '0' ? '0' : answer;
}
```

✅ 개선 풀이 (정렬 구간 최적화)

- i === j일 경우 정렬 없이 값 바로 리턴 → 불필요한 연산 제거

```javascript
const solution = (array, commands) =>
  commands.map(([i, j, k]) => {
    const subArray = array.slice(i - 1, j);
    if (subArray.length === 1) return subArray[0];
    return subArray.sort((a, b) => a - b)[k - 1];
  });
```

### 2️⃣ 가장 큰 수(프로그래머스 Level 2)

> 숫자 배열을 이어붙여 만들 수 있는 가장 큰 수를 반환하는 문제

✅ 풀이

- 문자열로 변환 후, 이어붙인 조합을 기준으로 내림차순 정렬
- '0'으로만 구성된 경우를 대비한 예외 처리 포함

```javascript
function solution(numbers) {
  const answer = numbers
    .map(String)
    .sort((a, b) => (b + a).localeCompare(a + b))
    .join('');

  return answer[0] === '0' ? '0' : answer;
}
```

### 3️⃣ H-Index (프로그래머스 Level 2)

> 논문의 인용 수 배열에서 H-Index를 계산하는 문제

✅ 기본 풀이

```javascript
function solution(numbers) {
  const answer = numbers
    .map(String)
    .sort((a, b) => (b + a).localeCompare(a + b))
    .join('');

  return answer[0] === '0' ? '0' : answer;
}
```

✅ 개선 풀이

- findIndex()를 사용해 조건이 깨지는 순간을 바로 리턴

```javascript
function solution(citations) {
  citations.sort((a, b) => b - a);
  const idx = citations.findIndex((item, i) => item < i + 1);
  return idx === -1 ? citations.length : idx;
}
```

# 💡 문제 풀이에 사용된 자바스크립트 `sort()` 내부 정렬 알고리즘

브라우저 엔진별 사용된 정렬 알고리즘이 다르다.

| JavaScript 엔진        | 사용 정렬 알고리즘       | 특징                      |
| ---------------------- | ------------------------ | ------------------------- |
| V8(Chrome, Node.js)    | Timesort, insertion sort | 안정 정렬, 빠름           |
| SpiderMonkey(Firefox)  | Merge sort               | ECMAScript에 맞게 개선됨  |
| JavaScriptCore(Safari) | QuickSort + 기타 최적화  | 빠르지만 안정 정렬이 아님 |

### ✅ 각 문제에서 사용된 정렬 알고리즘 요약

V8 기준으로 진행!
| 문제 | 사용된 정렬 함수 코드 | 실제 알고리즘 (V8 기준) |
| ---------- | -------------------------------------------- | ------------------------- |
| K번째 수 | sort((a, b) => a - b) | Timsort or Insertion Sort |
| 가장 큰 수 | sort((a, b) => (b + a).localeCompare(a + b)) | Timsort or Insertion Sort |
| H-Index | sort((a, b) => b - a) | Timsort or Insertion Sort |
