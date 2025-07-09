const solution = my_string => Array.from(my_string)
                                .map(e => e.toLowerCase())
                                .sort((a,b) => {
                                    if (a > b) return 1;
                                    else if (b > a) return -1;
                                    else return 0;
                                }).join('');