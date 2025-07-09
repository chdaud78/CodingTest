const solution = (num_list) => {
    let [product, sum] = [1, 0];
    
    for (const n of num_list) {
        product *= n;
        sum += n;
    }
    
    return product < sum ** 2 ? 1 : 0
}