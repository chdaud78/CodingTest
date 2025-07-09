const solution = c => c[2]-c[1]===c[1]-c[0] ? c.pop()+c[1]-c[0] : c.pop()*(c[1]/c[0]);
