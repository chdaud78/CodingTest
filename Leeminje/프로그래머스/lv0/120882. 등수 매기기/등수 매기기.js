const solution = score => {
    const avg = score.map((e,i) => [(e[0]+e[1])/2, i]);
    avg.sort((a,b) => b[0] - a[0]);

    const rank = avg.reduce((acc, cur, idx) => {
        acc[cur[1]] = (idx>0 && cur[0]===avg[idx-1][0]) ? acc[avg[idx-1][1]] : idx+1;
        return acc;
    }, []);

   return rank;
}
