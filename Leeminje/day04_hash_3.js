// 전화번호 목록

/** ✏️ 목표
 * - 전화번호부에서 한 번호가 다른 번호의 접두어인 경우가 있는지 검사하라
 * - 있으면 false, 없으면 true를 반환한다
 * - 이중 비교 없이 해시(Set)를 활용해 효율적으로 검사한다
 *
 * ► 예상 로직
 * 1. 모든 전화번호를 Set에 저장 (해시 테이블처럼 사용)
 * 2. 각 번호의 접두어(prefix)를 한 글자씩 잘라가며 Set에 존재하는지 확인
 * 3. 접두어가 Set에 있다면 → 접두사 관계가 있으므로 false 반환
 * 4. 모든 번호에서 접두사가 발견되지 않으면 true 반환
 */

// 초기 코드
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
// 뭔가 정렬하니,, set과 map 둘중에 하나를 사용하고 싶어서...

// 기존 코드 1
function solution(phone_book) {
  const set = new Set(phone_book);

  for (const number of phone_book) {
    for (let i = 1; i < number.length; i++) {
      if (set.has(number.slice(0, i))) return false;
    }
  }

  return true;
}

// 반복 횟수가 O(n * m)이기 때문에 사용! 만약 O(n^2)이면 절대 안됨..

/**
 * 📖 풀이 과정 설명
 *
 * 1️⃣ 해시 테이블(Set)로 전화번호 저장
 * - Set은 내부적으로 해시 테이블 구조를 가지며, 값의 존재 여부를 평균 O(1)에 확인할 수 있습니다.
 * - 모든 번호를 Set에 저장하면, 접두어 탐색을 빠르게 처리할 수 있습니다.
 *
 * 2️⃣ 접두어(prefix) 생성 및 탐색
 * - 각 번호를 순회하면서, 해당 번호의 접두어를 1자리씩 잘라 Set에 있는지 확인합니다.
 * - 예: "1195524421" → "1", "11", "119", ...을 만들어 Set.has(prefix)로 탐색
 *
 * 3️⃣ 접두어가 존재하는 경우
 * - 어떤 번호의 접두어가 Set에 존재한다면, 그건 다른 번호가 이 번호의 접두어란 뜻이므로 false를 반환합니다.
 *
 * 4️⃣ 모든 번호 확인 후 문제 없으면 true 반환
 * - 끝까지 충돌이 없다면, 접두사 관계가 없는 안전한 전화번호 목록입니다.
 */
