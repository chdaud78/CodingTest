## 🎈문제1
### 문제
[프로그래머스 연습 문제 LV2 의상](https://school.programmers.co.kr/learn/courses/30/lessons/42578)

### ✏️나의 문제 풀이

**예상 로직**
1. 오브젝트에 종류별 의상 갯수 저장
2. 의상의 종류별 갯수를 곱하여 저장

**풀이 과정 설명**

1. 의상의 종류에 따른 갯수 저장
   문제에서 `[의상의 이름, 의상의 종류]`로 주어지므로 object에 종류에 따라 갯수를 늘려줍니다.
2. 의상의 종류에 따른 수 결정
   object key는 종류에 따른 옷의 갯수이므로 `answer*=(value+1)`를 하여 곱해준다
   ex) headgear: 2개 -> 선택지는 3개 (yellow_hat, green_turban, 안입기)
   ex) eyewear: 1개 -> 선택지는 2개 (blue_sunglasses, 안입기)
   ex) `[3*2 = 6]`
3. 아무것도 입지 않는 경우의 수를 빼준다
   answer-1은 아무것도 입지않은 선택을 한 경우를 빼줘야한다. (하나는 입어야하므로)
   ex) headger: 안입기 + eyewear: 안입기
   ex) answer -1

```js
function solution(clothes) {
  let answer = 1;
  let objClothes = {};

  for(const cloth of clothes) {
    if(objClothes[cloth[1]]) objClothes[cloth[1]] += 1
    else objClothes[cloth[1]] = 1
  }

  for (const [key, value] of Object.entries(objClothes)) {
    answer *= value;
  }
  if(Object.keys(objClothes).length !== 1) {
    answer += clothes.length
  }

  return answer;
}
```

### 피드백 내용

1. const 선언
   ![](https://velog.velcdn.com/images/chdaud78/post/c307de18-b653-4fc5-a5b2-f897159d58b9/image.png)

2. 사용하지 않는 변수는 `_`로 표기하기
   ![](https://velog.velcdn.com/images/chdaud78/post/09c10633-68f3-48b5-9398-f83de8399b9b/image.png)

3. 종류 별 의상 수 계산
   ![](https://velog.velcdn.com/images/chdaud78/post/6bfda0de-5e02-47e0-9f4e-b07b242d9493/image.png)

### 개선 후
1. 오브젝트는 안에 값만 바뀔 뿐 본체는 바뀌지 않으므로  const 선언으로 변경해주어야한다.
2. 사용하지 않는 변수는 관습적으로 `_`로 표기한다고 한다.
3. type을 이용하여 종류에 따른 갯수를 저장해준다.

```js
function solution(clothes) {
  let answer = 1;
  const objClothes = {};

  for(const [_, type] of clothes) {
    objClothes[type] = (objClothes[type] || 0) +1;
  }

  for (const [_, value] of Object.entries(objClothes)) {
    answer*=(value+1)
  }

  return answer - 1;
}
```
### 팀원 코드 및 알게된 점
**민제님 코드**
```js
function validateClothes(clothes) {
  if (!Array.isArray(clothes)) throw new Error('❌ clothes가 배열이 아닙니다.');
  if (clothes.length === 0) throw new Error('❌ clothes의 값이 비어있습니다.');

  for (const item of clothes) {
    if (!Array.isArray(item) || item.length !== 2) {
      throw new Error('❌ 각 의상은 [이름, 종류] 형태의 배열이어야 합니다.');
    }

    const [_, type] = item;
    if (typeof type !== 'string' || type.trim() === '') {
      throw new Error('❌ 의상 종류(type)는 유효한 문자열이어야 합니다.');
    }
  }
}

function solution(clothes) {
  validateClothes(clothes);

  const clothesMap = new Map();

  // 1️⃣ 의상 종류별 개수를 세어 clothesMap에 저장
  for (const [_, type] of clothes) {
    clothesMap.set(type, (clothesMap.get(type) || 0) + 1);
  }

  // 2️⃣ 각 종류별 (입는 수 + 안 입는 경우 1)를 모두 곱한 뒤, 전부 안 입는 경우 1을 뺌
  const answer = [...clothesMap.values()].reduce((acc, count) => acc * (count + 1), 1);

  return answer - 1;
}
```

민제님은 예외 처리를 통하여 validation을 한다. 사실 코딩테스트에서 validation을 하는 경우는 잘 없지만 실무에서는 좋은 습관이므로 예행 연습 겸 적으면 좋은 점이 많은 것 같다.

코드 내부적으로는 해시 맵(맵 객체)를 이용하여 set, get을 통해 맵 객체에 저장하고, reduce를 통하여 간단하게 계산하였다.

**원형님 코드**
```js
function solution(clothes) {
    const map=new Map();
    
    for(let[item,type]of clothes){
        if(!map.has(type)){
            map.set(type,[]);
        }
        map.get(type).push(item);
    }
    
    let mix = 1;
    for(let item of map.values()){
        mix *= (item.length + 1);
    }
    
    return mix - 1;
}
```

원형님의 경우 나의 개선 풀이와 매우 비슷하다. 나는 object를 썼지만 원형님은 맵 객체를 이용하여 풀이하였다.

## 🎈문제2
### ✏️문제
[프로그래머스 연습 문제 LV3 베스트앨범](https://school.programmers.co.kr/learn/courses/30/lessons/42579)
### 나의 문제 풀이
**예상 로직**
1. genres와 plays를 결합한 배열 생성
2. 생성한 배열을 이용하여 genres에 따른 총 플레이 수를 저장한 object 생성 / 장르별 노래(플레이수와 고유 id)를 저장한 object 생성
3. 총 플레이 수에 따라 오름차순 정렬한 장르
4. 정렬한 장르 별 따라 노래 정렬
   4-1. play이가 다르면 play에 따라 정렬(오름차순)
   4-2. play이가 같으면 id에 따라 정렬(내림차순)
5. 정답에 저장

**풀이 과정 설명**
1. 장르와 play이가 따로이므로 장르와 플레이, 고유번호를 합친 배열 저장
   map 함수를 이용해 값과 index를 뽑아 새롭게 저장
   `genres.map((x,i) => [x,plays[i],i]);` 여기서 `plays[i]`는 genre i번과 매칭되는 재생 수
2. 장르별 플레이수와 장르별 노래 목록 저장
   합친 배열 `genAndPlay`의 값들을 이용해 저장
   genre별 총 플레이 수 저장 => `(genrePlayCount[genre] || 0) + play;` 장르가 존재하지 않으면 0을 + play 수로 총합 저장
   `{ classic: 1450, pop: 3100 }`
   genreSongs[genre]를 만들어 장르별 {id, play}를 push
   `{
   classic: [ { id: 0, play: 500 }, { id: 2, play: 150 }, { id: 3, play: 800 } ],
   pop: [ { id: 1, play: 600 }, { id: 4, play: 2500 } ]
   }`
3. 총 플레이 수를 오름차순 정렬하여 새로운 배열에 저장
   `Object.entries`를 이용해 배열로 변환 -> `sort`를 통해 정렬
   `map`함수를 통해 장르만 저장
4. 오름차순 정렬을 이용하여 장르별 노래 목록을 조건에 맞게 정렬
   `genreSongs[genre]`를 이용해 장르에 해당하는 부분을 정렬
   `sort` 함수를 이용하여 내부 return 조건 작성
   재생 수 같지 않으면 play 순으로 오름차순 정렬
   재생 수 같으면 id 순으로 내림차순 정렬

5. 정답에 저장
   `songs[0].id` : 해당 장르의 플레이가 가장 많이된 것 id 저장
   `songs[1].id` : 그다음으로 플레이 많이 된 것 id 저장
   주의할점 : `songs[1].id`를 저장 시 `songs[1]`이 존재하는지 검사해야함(안하면 컴파일 오류 나옴)

```js
function solution(genres, plays) {
  let answer = [];
  const genAndPlay = genres.map((x,i) => [x,plays[i],i]);
  let genrePlayCount = {};
  let genreSongs = {};

  for (const [genre, play, id] of genAndPlay) {
    // 장르별 총 플레이수 저장
    genrePlayCount[genre] = (genrePlayCount[genre] || 0) + play;

    // 장르별 노래 목록 저장
    if (!genreSongs[genre]) genreSongs[genre] = [];
    genreSongs[genre].push({ id, play });
  }

  // 장르 오름차순
  let sortedPlayCount =  Object.entries(genrePlayCount).sort((a,b) => b[1] - a[1]).map(([genre]) => genre);

  for(const genre of sortedPlayCount) {
    let songs = genreSongs[genre].sort((a,b) => {
      // 재생 수 같지 않으면 play 순으로 정렬
      if(a.play !== b.play) return b.play - a.play
      // 재생 수 같으면 id 순으로 정렬
      else return a.id - b.id
    })
    // console.log(songs)
    // answer에 저장
    answer.push(songs[0].id)
    if(songs[1]) answer.push(songs[1].id)
  }

  return answer;
}
```

### 피드백 내용

1. Map 객체 이용하여 풀어보기
   ![](https://velog.velcdn.com/images/chdaud78/post/8710bee5-83f8-488b-b325-d75ad84fe6a0/image.png)
   ![](https://velog.velcdn.com/images/chdaud78/post/5a72864d-dc8a-481a-b470-8bc2ba983e1b/image.png)

2. const 사용하기
   ![](https://velog.velcdn.com/images/chdaud78/post/dd74fa77-90c3-4bfc-b71e-b7eb79e14eff/image.png)

3. 논리 연산자를 이용하여 한번에 처리하기
   ![](https://velog.velcdn.com/images/chdaud78/post/cfcfd838-b1c8-480b-9f9a-b597b66c48b5/image.png)

4. js 내장함수를 통해 조건문 판단 없이 바로 처리하기
   ![](https://velog.velcdn.com/images/chdaud78/post/a9e4b679-115d-4e21-af3c-0916e649f750/image.png)

5. 👍
   ![](https://velog.velcdn.com/images/chdaud78/post/04ecc962-6ac7-45fc-9b42-fcf4d8af457a/image.png)

### 개선 후
1. 오브젝트는 안에 값만 바뀔 뿐 본체는 바뀌지 않으므로  const 선언으로 변경해주어야한다.
2. 논리 연산자를 이용하여 if~else를 대신할 수 있다.
3. js 내장 함수(`slice()`)를 이용하여 조건문 판단 없이 바로 처리할 수 있다.

```js
function solution(genres, plays) {
  const answer = [];
  const genAndPlay = genres.map((x,i) => [x,plays[i],i]);
  const genrePlayCount = {};
  const genreSongs = {};

  for (const [genre, play, id] of genAndPlay) {
    // 장르별 총 플레이수 저장
    genrePlayCount[genre] = (genrePlayCount[genre] || 0) + play;

    // 장르별 노래 목록 저장
    if (!genreSongs[genre]) genreSongs[genre] = [];
    genreSongs[genre].push({ id, play });
  }

  // 장르 오름차순
  let sortedPlayCount =  Object.entries(genrePlayCount).sort((a,b) => b[1] - a[1]).map(([genre]) => genre);

  for(const genre of sortedPlayCount) {
    // 재생 수 같지 않으면 play 순으로 정렬
      // 재생 수 같으면 id 순으로 정렬
    let songs = genreSongs[genre].sort((a,b) => b.play - a.play || a.play - b.paly)
    
    // answer에 저장
     songs.slice(0, 2).forEach(song => answer.push(song.id));
  }

  return answer;
}
```
### 팀원 코드 및 알게된 점
**민제님 코드**
```js
// 기존코드
function solution(genres, plays) {
  const playCountMap = new Map(); // 장르 → 총 재생 횟수
  const songsMap = new Map(); // 장르 → [[고유 번호, 재생 수], ...]

  // 1️⃣ 각 장르별로 총 재생 수와 곡 목록을 저장
  genres.forEach((genre, idx) => {
    const play = plays[idx];
    // 총 재생 수 누적
    playCountMap.set(genre, (playCountMap.get(genre) || 0) + play);
    // 해당 장르에 곡 추가
    if (!songsMap.has(genre)) songsMap.set(genre, []);
    songsMap.get(genre).push([idx, play]);
  });

  // 2️⃣ 장르를 총 재생 수 기준으로 내림차순 정렬
  const sortedGenres = [...playCountMap.entries()]
    .sort((a, b) => b[1] - a[1]) // 재생 수 기준 정렬
    .map(([genre]) => genre); // 장르 이름만 추출

  const answer = [];

  // 3️⃣ 각 장르별로 상위 2곡씩 선택
  for (const genre of sortedGenres) {
    const topSongs = songsMap
      .get(genre)
      .sort((a, b) => b[1] - a[1] || a[0] - b[0])
      // 🎵 정렬 기준
      // 1) 재생 수 많은 순 (b[1] - a[1])
      // 2) 재생 수 같으면 고유 번호 낮은 순 (a[0] - b[0])
      .slice(0, 2); // 최대 2곡 선택

    // 4️⃣ 고유 번호만 추출하여 정답 배열에 추가
    answer.push(...topSongs.map(([idx]) => idx));
  }

  return answer;
}
```
Map 객체를 이용하여 재생수 기준 정렬을 한다. slice를 이용하여 2곡을 선택한다. 최대한 if~else를 지양하고 내장함수를 사용하는 코드들이 배울 점이 많은 것 같다.

**원형님 코드**
```js
function solution(genres, plays) {
    const playmap = new Map();
    const genremap = new Map();
    //장르별 곡수 총합, 곡정보 저장
    for(let i =0; i<genres.length; i++){
        const genre = genres[i];
        const play= plays[i];
        
        playmap.set(genre, (playmap.get(genre)||0)+play);
        if(!genremap.has(genre)){
            genremap.set(genre,[]);
        }
        genremap.get(genre).push({ index:i, play:play})
    }
    //장르별로 정렬
    const playnum = [...playmap.entries()]
        .sort((a,b)=>b[1]-a[1])
        .map(([genre])=>genre);
    
    //장르별 상위 2곡 정렬 및 추출
    const answer = [];

    for (const genre of playnum) {
        const songs = genremap.get(genre);

        songs.sort((a, b) => {
            if (b.play === a.play) return a.index - b.index;
            return b.play - a.play;
        });

        const topSongs = songs.slice(0, 2);
        for (const song of topSongs) {
            answer.push(song.index);
        }
    }

    return answer;    
}
```

마찬가지로 slice를 사용했다. if문을 최대한 줄이는 방법을 고민해보면 좋을 것 같다.