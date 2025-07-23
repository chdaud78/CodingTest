// 모음 사전

/** ✏️ 목표
 * - 주어진 word가 모음 사전 내에서 몇 번째 단어인지 return
 *
 * ► 예상 로직 dfs
 * 1. 모음 배열 초기화
 * 2. dfs를 통해 모음 조합을 한다.
 * 2-1. 모음 조합 할때만다 count를 증가시켜준다.
 * 2-2. 종료 조건은 찾고자하는 단어가 현재 단어 조합과 같을 때 종료
 */

function solution(word) {
  let answer = 0;
  let flag = false;
  const alphabets = ['A', 'E', 'I', 'O', 'U'];

  const dfs = (now) => {
    // 현재 단어의 길이가 5이상이면 진행 x
    // flag가 true면 하위 코드 진행x -> 바로 return
    if(now.length > 5 || flag) return;

    // 찾고자하는 단어 와 현재 단어가 같으면 flag를 true로 변경
    if(now === word) {
      flag = true;
      return;
    }

    answer++;

    for(let i = 0 ; i < alphabets.length ; i++) {
      dfs(now+alphabets[i]);
    }
  }

  dfs('')

  return answer;
}

/**
 * 📖 풀이 과정 설명
 *
 * 1. 알파벳 모음을 초기화해준다.
 * `const alphabets = ['A', 'E', 'I', 'O', 'U'];`
 * 2. 현재 단어 조합을 인자로 dfs를 순회한다.
 * 종료조건 1-1) now.length > 5이상이면 길이 5이하인 사전에 벗어나므로 종료해준다.
 * 종료조건 1-2) flag가 true이면 이후 진행을 모두 멈추고 return 해준다(continue라고 생각하면 편함)
 * 종료조건 2) 현재 단어 조합이 찾고자 하는 단어와 같으면 flag를 true로 해준다.
 * answer를 증가시켜 몇번째인지 정한다.
 * 3. 모음의 갯수만큼 반복하며 재귀한다.ㄴ
 */