const solution = (spell, dic) => dic.filter(e => spell.every(i => e.includes(i))).length === 0 ? 2 : 1;
