const solution = num_list => num_list.reduce((res, n) => {
	res[n % 2 === 0 ? 0 : 1] += 1;
	return res;
}, [0, 0]);