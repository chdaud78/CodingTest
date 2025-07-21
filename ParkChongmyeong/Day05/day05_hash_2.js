// 베스트 앨범

/** ✏️ 목표
 * - 장르 별 가장 많이 재생된 노래 2개씩 모아 앨범 만들기
 *
 * ► 예상 로직
 * 1. genres와 plays를 결합한 배열 생성
 * 2. 생성한 배열을 이용하여 genres에 따른 총 플레이 수를 저장한 object 생성 / 장르별 노래(플레이수와 고유 id)를 저장한 object 생성
 * 3. 총 플레이 수에 따라 오름차순 정렬한 장르
 * 4. 정렬한 장르 별 따라 노래 정렬
 * 4-1. play이가 다르면 play에 따라 정렬(오름차순)
 * 4-2. play이가 같으면 id에 따라 정렬(내림차순)
 * 5. 정답에 저장
 */

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

/**
 * 📖 풀이 과정 설명
 * 1️⃣ 장르와 play이가 따로이므로 장르와 플레이, 고유번호를 합친 배열 저장
 * - map 함수를 이용해 값과 index를 뽑아 새롭게 저장
 * - genres.map((x,i) => [x,plays[i],i]); 여기서 plays[i]는 genre i번과 매칭되는 재생 수
 * 2️⃣ 장르별 플레이수와 장르별 노래 목록 저장
 * -합친 배열 genAndPlay의 값들을 이용해 저장
 * -genre별 총 플레이 수 저장 => (genrePlayCount[genre] || 0) + play; 장르가 존재하지 않으면 0을 + play 수로 총합 저장
 * { classic: 1450, pop: 3100 }
 * -genreSongs[genre]를 만들어 장르별 {id, play}를 push
 * {
 *   classic: [ { id: 0, play: 500 }, { id: 2, play: 150 }, { id: 3, play: 800 } ],
 *   pop: [ { id: 1, play: 600 }, { id: 4, play: 2500 } ]
 * }
 * 3️⃣ 총 플레이 수를 오름차순 정렬하여 새로운 배열에 저장
 * - Object.entries를 이용해 배열로 변환 -> sort를 통해 정렬
 * - map함수를 통해 장르만 저장
 * 4️⃣ 오름차순 정렬을 이용하여 장르별 노래 목록을 조건에 맞게 정렬
 * - genreSongs[genre]를 이용해 장르에 해당하는 부분을 정렬
 * - sort 함수를 이용하여 내부 return 조건 작성
 * - 재생 수 같지 않으면 play 순으로 오름차순 정렬
 * - 재생 수 같으면 id 순으로 내림차순 정렬
 * 
 * 5️⃣ 정답에 저장
 * - songs[0].id : 해당 장르의 플레이가 가장 많이된 것 id 저장
 * - songs[1].id : 그다음으로 플레이 많이 된 것 id 저장
 * - 주의할점 : songs[1].id를 저장 시 songs[1]이 존재하는지 검사해야함(안하면 컴파일 오류 나옴)
 */