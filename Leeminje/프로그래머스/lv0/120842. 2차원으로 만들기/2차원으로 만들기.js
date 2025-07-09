const solution = (list, n) => list
    .map((e, idx) => idx % n === 0 ? list.slice(idx, idx + n) : -1)
    .filter(arr => arr !== -1);