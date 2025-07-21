// 의상

/** ✏️ 목표
 * - [의상의 이름, 의상의 종류]에서
 * - 선택 가능한 서로 다른 옷의 조합 수를 return
 *
 * ► 예상 로직
 * 1. 오브젝트에 종류별 의상 갯수 저장
 * 2. 의상의 종류별 갯수를 곱하여 저장
 */

// 개선 코드
function solution(clothes) {
  let answer = 1;
  let objClothes = {};

  for(const [name, type] of clothes) {
    objClothes[type] = (objClothes[type] || 0) +1;
  }

  for (const [key, value] of Object.entries(objClothes)) {
    answer*=(value+1)
  }

  return answer - 1;
}

/**
 * 📖 풀이 과정 설명
 * 1️⃣ 의상의 종류에 따른 갯수 저장
 * - 문제에서 [의상의 이름, 의상의 종류]로 주어지므로 object에 종류에 따라 갯수를 늘려줍니다.
 * 2️⃣ 의상의 종류에 따른 수 결정
 * object key는 종류에 따른 옷의 갯수이므로 answer*=(value+1)를 하여 곱해준다
 * ex) headgear: 2개 -> 선택지는 3개 (yellow_hat, green_turban, 안입기)
 * ex) eyewear: 1개 -> 선택지는 2개 (blue_sunglasses, 안입기)
 * ex) [3*2 = 6]
 * 3️⃣ 아무것도 입지 않는 경우의 수를 빼준다
 * answer-1은 아무것도 입지않은 선택을 한 경우를 빼줘야한다. (하나는 입어야하므로)
 * ex) headger: 안입기
 * ex) eyewear: 안입기
 * ex) answer -1
 */

// 처음 코드
/**
 * ❌ 실패 이유
 * 아무것도 입지 않는 경우도 고려해야함
 * 조합 수를 구하는 수학적으로 로직이 틀렸음
 * ✔️ 개선 할 점
 * 각 종류 별 선택에서 안입는 경우의 수를 더해야 함 (* value가 아닌 *(value +1)이 되어야함)
 * 마지막으로 아무것도 안입는 수를 빼야한다.(answer -1)
**/

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

