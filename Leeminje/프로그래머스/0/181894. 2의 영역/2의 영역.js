const solution = (arr) => {
    if (!arr.includes(2)) return [-1];
    
    const startIdx = arr.indexOf(2);
    const endIdx = arr.lastIndexOf(2);
    
    return arr.slice(startIdx, endIdx + 1);
} 