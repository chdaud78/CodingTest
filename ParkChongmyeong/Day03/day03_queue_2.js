function solution(priorities, location) {
  let answer = 0;
  let mapPriorities = priorities.map((x,i) => [i,x]);

  while(mapPriorities.length > 0) {
    let tmp = mapPriorities.shift();
    if(mapPriorities.some((x) => x[1] > tmp[1])) {
      mapPriorities.push(tmp);
    }
    else {
      answer++;
      if(tmp[0] === location) return answer;
    }

  }

  return answer;
}