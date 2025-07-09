// const solution = (my_strings, parts) => my_strings.map((e, i) => e.slice(parts[i][0], parts[i][1] + 1)).join('');

const solution = (my_strings, parts) => parts.map(([e, v], i) => my_strings[i].slice(e, v + 1)).join('');