// 조이스틱

/**
 * ✏️ 목표
 * - `AAA`, `AAAAA` 등 `A`로 초기화된 문자열을 조이스틱을 이용하여 원하는 문자로 만들 때, 최소 이동 return 하기
 *
 * ► 예상 로직 1
 * 1. 각 문자에 대해 위 아래 최소 이동 구하기
 * A에서 위로 가는 것 vs Z에서 아래로 가는 것
 * 중 더 작은 값을 저장
 *
 * 2. 각 문자에 대해 좌우 최소 이동 구하기
 * 오른쪽으로 계속 이동하는 방식 vs 한 방향으로 가다가 다시 돌아가는 방식
 * 중 더 작은 값 저장
 *
 * 3. 두개 합치기
 */
function solution(name) {
  let moveUD = 0;

  for(let i = 0 ; i < name.length; i++) {
    const charCode = name.charCodeAt(i);
    // A에서 위로 이동하는 방법
    const up = charCode - 'A'.charCodeAt(0);
    // Z에서 아래로 이동하는 방법
    const down = 'Z'.charCodeAt(0) - charCode + 1;
    // 둘중 더 작은 값을 저장
    moveUD += Math.min(up, down)
  }

  // 기본 좌우 이동은 오른쪽으로만 움직임
  // name.length - 1번 함.
  let moveLR = name.length - 1;
  for(let i = 0 ; i< name.length; i++) {
    let next = i+1;
    // A가 연속으로 나오면 오른쪽으로 갈 필요없음
    while(next < name.length && name[next] === 'A') {
      next++;
    }

    // i까지 갔다가 반대로 돌아가는 경로 vs 오른쪽으로 쭉 이동 비교
    // i는 현재 위치
    // name.length - next는 다시 돌아가기
    // Math.min은 앞에서 돌거나 뒤에서 도는 방향중 최소를 선택
    moveLR = Math.min(moveLR, i + name.length - next + Math.min(i, name.length - next));
  }

  return moveUD + moveLR;
}

/**
 * 📖 풀이 과정 설명
 *
 * 1. 위 아래 이동 중 더 작은 값 찾기
 * `charCodeAt`으로 `unicode`로 변경하여 비교
 * `up` : `현재 단어의 unicode - A unicode`
 * `down` : `Z unicode - 현재 unicode + 1`(1을 더해주는 이유는 A에서 Z로 가려면 1칸 이동해야함)
 * `Math.min`을 통해 `up`과 `down` 비교하여 작은 값 저장
 *
 * 2. 좌우 이동 중 더 작은 값 찾기
 * 기본 움직임을 오른쪽으로 계속 이동이라고 한다면 `name.length -1` 만큼 움지여야함
 * 따라서 기본을 `name.length -1` 로 초기화
 * `next`는 다음 단어의 `index`
 * `next`가 A를 만나면 넘긴다.
 * `Math.min`을 이용하여 오른쪽으로 쭉가기 vs 다시 돌아가는 방법 비교하여 계산
 * cf) `Math.min`에서 `moveLR` : 오른쪽으로 쭉 가기 수
 * cf) `i` : 현재 위치
 * cf) `name.length - next` : 다시 반대로 가는 방법
 * cf) `Math.min(i, name.length - next)` : Math.min은 앞에서 돌거나 뒤에서 도는 방향 중 최소를 선택한 방법
 *
 * 3. 둘을 더해준다.
 */