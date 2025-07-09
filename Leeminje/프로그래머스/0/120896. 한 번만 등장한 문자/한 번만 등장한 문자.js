// const solution = s => [...s].filter(e => s.indexOf(e) === s.lastIndexOf(e)).sort().join('');
const solution = s => {
    const hash = {};
    
    for (const c of s) {
        hash[c] = (hash[c] || 0) + 1;        
    }

    return Object.entries(hash).filter(e => e[1] === 1).map(e => e[0]).sort().join('');
}