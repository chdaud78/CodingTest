// 베스트앨범

/** ✏️ 목표
 * - 장르별로 가장 많이 재생된 노래를 2개까지 모아 앨범을 만든다.
 * - 장르 순서는 전체 재생 횟수가 높은 장르부터 정렬한다.
 * - 각 장르 내 노래는 재생 횟수가 높은 순으로 정렬하며, 재생 횟수가 같다면 고유 번호가 낮은 노래가 우선된다.
 *
 * ✅ 반환값: 고유 번호(index) 배열
 *
 * ✏️ 예상 로직
 * 1. 각 장르별 총 재생 수를 계산한다.(해시맵 1)
 * 2. 각 장르별로 속한 노래 정보를 저장한다. (해시맵 2)
 * 3. 장르를 재생 수 기준으로 정렬한 뒤,
 * 4. 각 장르에서 조건에 따라 최대 2곡을 선택하고,
 * 5. 고유번호만 정답 배열에 담는다!
 * ... 이게 뭐꼬....진짜..
 */

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

/**
 * 📖 풀이 과정 설명
 * 1️⃣ 장르별 정보 수집
 * - playCountMap: 각 장르의 총 재생 횟수를 누적
 * - songsMap: 장르별로 곡 목록 저장 ([index, play] 형식)
 * - 이 때 Map 자료구조를 활용해 삽입, 조회 모두 빠르게 처리
 *
 * 2️⃣ 장르 정렬
 * - playCountMap을 배열로 변환 후,
 * - 재생 수 내림차순 정렬
 * - 장르 이름만 추출하여 사용
 *
 * 3️⃣  곡 정렬 및 선택
 * - songsMap.get(genre)로 해당 장르 곡 리스트를 가져옴
 * - 정렬 기준:
 *   1. 재생 수 내림차순
 *   2. 재생 수 같으면 고유 번호 오름차순
 * - 최대 2곡까지 slice(0, 2)로 추출
 *
 * 4️⃣ 정답 구성
 * - 정렬된 곡 리스트에서 고유 번호만 추출
 * - push(...array)로 정답 배열에 이어 붙이기
 */
