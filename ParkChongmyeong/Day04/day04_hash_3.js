function solution(phone_book) {
  phone_book.sort((a,b) => a.localeCompare(b));

  for(let i = 0 ; i < phone_book.length-1 ; i++) {
    if(phone_book[i+1].startsWith(phone_book[i])) return false;
  }

  return true;
}