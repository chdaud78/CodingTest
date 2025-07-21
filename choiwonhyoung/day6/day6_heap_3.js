//이중우선순위큐
function solution(operations) {
  const queue = [];

  for (let op of operations) {
    const [Str, Num] = op.split(' ');
    const num = Number(Num);

    if (Str === 'I') {
      queue.push(num); 
    } else if (Str === 'D') {
      if (queue.length === 0) continue;

      if (num === 1) {
        // 최댓값 삭제
        let max = Math.max(...queue);
        let idx = queue.indexOf(max);
        queue.splice(idx, 1);
      } else if (num === -1) {
        // 최솟값 삭제
        let min = Math.min(...queue);
        let idx = queue.indexOf(min);
        queue.splice(idx, 1);
      }
    }
  }

  if (queue.length === 0) return [0, 0];

  return [Math.max(...queue), Math.min(...queue)];
}