const solution = (n, k) => Array.from({length: Math.trunc(n/k)}, (_, i) => (i+1)*k);
