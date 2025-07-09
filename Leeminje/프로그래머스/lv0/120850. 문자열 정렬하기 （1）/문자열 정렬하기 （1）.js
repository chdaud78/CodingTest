const solution = my_string => Array.from(my_string)
                                .filter(e => !isNaN(+e))
                                .sort((a,b) => a-b)
                                .map(e => +e);