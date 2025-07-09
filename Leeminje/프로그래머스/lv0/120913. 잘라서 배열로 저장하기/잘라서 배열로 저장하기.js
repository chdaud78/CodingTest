const solution = (my_str, n) => Array(Math.ceil(my_str.length/n)).fill(1).map((e,i) => my_str.substr(i*n, n));
