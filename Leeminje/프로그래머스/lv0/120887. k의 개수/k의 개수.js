const solution = (i, j, k) => {
    let count = 0;
    for(i; i<=j; i++) {
        count += [...i.toString()].filter(num => num==k).length;
    }
    return count;
}
