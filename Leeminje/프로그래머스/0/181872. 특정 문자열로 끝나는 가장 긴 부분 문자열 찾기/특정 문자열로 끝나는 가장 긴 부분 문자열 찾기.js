// const solution = (myString, pat) => [...myString].slice(0, myString.lastIndexOf(pat) + pat.length).join('');

const solution = (myString, pat) => myString.slice(0, myString.lastIndexOf(pat) + pat.length);