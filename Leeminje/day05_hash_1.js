// 의상

/** ✏️ 목표
 * - 코니가 의상들을 입는 서로 다른 조합의 수를 계산한다.
 * - 하루에 최소 한 개의 의상은 입어야 하며, 같은 종류의 옷은 동시에 입을 수 없다.
 *
 * ✏️ 예상 로직
 * 1. 의상 종류별로 몇 개의 아이템이 있는지 집계한다.
 * 2. 각 종류에서 아이템을 입는 경우의 수는 (아이템 수 + 안 입는 선택 1).
 * 3. 각 종류의 조합 수를 곱한 뒤, 전부 안 입는 경우 1가지를 제외한다.
 */

// 기존코드
function solution(clothes) {
  const clothesMap = new Map();

  // 1️⃣ 의상 종류별 개수를 세어 clothesMap에 저장
  for (const [_, type] of clothes) {
    clothesMap.set(type, (clothesMap.get(type) || 0) + 1);
  }

  // 2️⃣ 각 종류별 (입는 수 + 안 입는 경우 1)를 모두 곱한 뒤, 전부 안 입는 경우 1을 뺌
  const answer = [...clothesMap.values()].reduce((acc, count) => acc * (count + 1), 1);

  return answer - 1;
}

/**
 * 📖 풀이 과정 설명
 * 1️⃣ Map 자료구조를 사용해 각 의상 종류별 개수를 센다.
 *     예: [["hat", "headgear"], ["sunglasses", "eyewear"]] ➝ headgear: 1, eyewear: 1
 *
 * 2️⃣ 각 종류별로 입는 경우의 수는 (해당 종류 아이템 수 + 입지 않는 경우 1)이다.
 *     예: headgear: 2개 ➝ 3가지 선택 (2개 중 택1 + 입지 않기)
 *
 * 3️⃣ 모든 종류의 경우의 수를 곱하면 전체 조합 수가 되며,
 *     이 중 '전부 안 입는 경우'를 빼서 최종 정답을 구한다.
 */

// 개선 풀이
// - 예외처리 추가
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
