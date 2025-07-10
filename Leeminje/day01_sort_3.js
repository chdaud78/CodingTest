// 📖
// function solution(citations) {
//   citations.sort((a, b) => b - a);

//   for (let i = 0; i < citations.length; i++) {
//     if (citations[i] < i + 1) return i;
//   }

//   return citations.length;
// }

// 개선 코드

/**
 * 💡 개선 코드
 * -
 */
function solution(citations) {
  citations.sort((a, b) => b - a);

  const idx = citations.findIndex((item, i) => item < i + 1);
  return idx === -1 ? citations.length : idx;
}
