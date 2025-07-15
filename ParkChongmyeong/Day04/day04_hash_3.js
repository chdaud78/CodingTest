// 개선 후
// 정렬 후 이전과 다음 비교
function solution(phone_book) {
  phone_book.sort((a,b) => a.localeCompare(b));

  for(let i = 0 ; i < phone_book.length-1 ; i++) {
    if(phone_book[i+1].startsWith(phone_book[i])) return false;
  }

  return true;
}

// 개선 전
// 2문제 틀림 + 효율성 부족
// 시간 복잡도 개선 필요
function solution(phone_book) {
  let answer = true;

  // 이중 for문을 통하여 하나씩 비교
  for(let i = 0 ; i < phone_book.length; i++) {
    for(let j = i + 1 ; j < phone_book.length; j++) {
      // 같으면 false return
      if(phone_book[j].startsWith(phone_book[i])) return false;
    }
  }

  return answer;
}