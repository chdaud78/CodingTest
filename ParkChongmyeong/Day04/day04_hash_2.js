function solution(nums) {
  let answer = 0;
  let N = nums.length;
  // 중복 제거
  let setNums = [...new Set(nums)];

  // 중복 제거한 폰켓몬의 수가 N/2 보다 크면 N/2 return
  // N/2보다 작으면 중복 제거한 폰켓몬의 수만큼 return
  setNums.length > N/2 ? answer = N/2 : answer = setNums.length;

  return answer
}