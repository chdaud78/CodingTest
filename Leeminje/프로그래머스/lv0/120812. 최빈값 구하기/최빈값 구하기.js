function solution(array) {    
    let obj = {};
    let newArr = [];

    array.forEach((n) => {
        obj[n] ? ++obj[n] : obj[n] = 1;
    });
    
    for (let i in obj) newArr.push([i, obj[i]]);
    
    newArr.sort((a, b) => b[1] - a[1]);
    return (newArr.length > 1 && newArr[0][1] === newArr[1][1]) ? -1 : Number(newArr[0][0]);
}

