// const solution = (spell, dic) => {
//     const cntArr = dic.map(e => spell.filter(v => e.includes(v)).length).sort();
    
//     return cntArr[cntArr.length - 1] === spell.length ? 1 : 2;
// }


const solution = (spell, dic) => {
    const str = spell.sort().join('');
    
    for (const word of dic) {
        if ([...word].sort().join('') === str) return 1;
    }
    
    return 2;
}