function solution(participant, completion) {
  let objectParticipant = {};

  // participant object에 추가
  for(const name of participant) {
    if(objectParticipant[name]) {
      // 이미 존재하면 +1
      objectParticipant[name] += 1;
    } else {
      // 없으면 1
      objectParticipant[name] = 1;
    }
  }

  // completion과 대조하여 있으면 -1 해주기
  for(const name of completion) {
    objectParticipant[name] -= 1
  }

  // 0이상이면 완주 못한 것이므로 key값(name) return
  for(const key in objectParticipant) {
    if(objectParticipant[key] > 0) return key
  }
}