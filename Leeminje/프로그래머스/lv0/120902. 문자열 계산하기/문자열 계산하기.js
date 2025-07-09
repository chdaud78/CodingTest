const solution = my_string => {
    const arr = my_string.split(' ').filter(e => e);
    
    let result = arr.reduce((acc, cur, idx) => {
        if (idx%2 === 0) return acc + (arr[idx-1]==="-" ? -1 : 1) * Number(cur);
        else return acc;
    }, 0);

    return result;
}
