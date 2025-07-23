/** ✏️ 목표
 * - yellow와 brown으로 이루어진 카펫의 크기 구하기
 *
 * ► 예상 로직 1
 * 1. brwon+yellow/x = y를 이용하여 y와 x를 표현한다.
 * 2. x-2 * y-2 = yellow를 이용하여 이를 만족하는 x,y를 찾는다.
 */

function solution(brown, yellow) {
  const total = brown + yellow;

  for(let h = 3; h <= Math.sqrt(total); h++) {
    const w = total/h;
    const check = (w - 2) * (h - 2) === yellow;

    if(check) return [w,h];
  }
}

// x-2 * y-2 === yellow
// brown + yellow / x = y

/**
 * 📖 풀이 과정 설명
 * 1️⃣ (brown + yellow) * (brown + yellow)의 크기가 최대 값이므로 for의 조건을 이로 정한다.
 * 2️⃣ (brown + yellow) / x = y를 이용하여 x를 표현한다. (여기서는 x = w, y = h)
 * brown+yellow = total 이라고한다면
 * w = total/h로 표현 가능하다.
 * 3️⃣ (w-2) * (h-2) === yellow를 만족하는 w,h를 찾아 return한다.
 */