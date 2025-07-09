// const solution = (myString, pat) => [...myString].map(e => e === 'A' ? 'B' : 'A').join('').includes(pat) ? 1 : 0;

const solution = (myString, pat) => myString.replace(/(A)|(B)/g, (_, a) => a ? 'B' : 'A').includes(pat) ? 1 : 0;