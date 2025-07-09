const solution = my_string => [...my_string].reduce((acc, e) => {
    if (!isNaN(e)) acc.push(e * 1);
    return acc;
}, []).sort();