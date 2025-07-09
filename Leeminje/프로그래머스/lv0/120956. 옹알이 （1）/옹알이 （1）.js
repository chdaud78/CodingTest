const solution = babbling => {
    let cnt = 0;
    const regex = /^(aya|ye|woo|ma)+$/;

    babbling.forEach(babbling => {
        if (regex.test(babbling)) cnt++;  
    })

    return cnt;
}