const solution = (numbers, hand) => {
    const key = { 1: 'L', 4: 'L', 7: 'L', 3: 'R', 6: 'R', 9: 'R' };
    const keyPosition = new Map([
        [1, [0, 0]], [2, [0, 1]], [3, [0, 2]],
        [4, [1, 0]], [5, [1, 1]], [6, [1, 2]],
        [7, [2, 0]], [8, [2, 1]], [9, [2, 2]],
        ['*', [3, 0]], [0, [3, 1]], ['#', [3, 2]]
    ]);
    
    let answer = '';
    let leftHand = '*';
    let rightHand = '#';
    
    numbers.forEach((e) => {
        if (key[e] === 'L') {
            answer += 'L';
            leftHand = e;
        } else if (key[e] === 'R') {
            answer += 'R';
            rightHand = e;
        } else {
            const numberPosition = keyPosition.get(e);
            if (numberPosition) {
                const leftDistance = getDistance(keyPosition.get(leftHand), numberPosition);
                const rightDistance = getDistance(keyPosition.get(rightHand), numberPosition);

                if (leftDistance < rightDistance) {
                    answer += 'L';
                    leftHand = e;
                } else if (rightDistance < leftDistance) {
                    answer += 'R';
                    rightHand = e;
                } else {
                    if (hand === 'left') {
                        answer += 'L';
                        leftHand = e;
                    } else {
                        answer += 'R';
                        rightHand = e;
                    }
                }
            }
        }
    });

    return answer;
}

const getDistance = (handPosition, numberPosition) => {     
    const [handRow, handCol] = handPosition;
    const [numberRow, numberCol] = numberPosition;

    return Math.abs(handRow - numberRow) + Math.abs(handCol - numberCol);
}
