const solution = my_string => [...my_string].reduce((acc, e) => {
        acc.push(e.toLowerCase());
        return acc;    
    }, []).sort().join('');