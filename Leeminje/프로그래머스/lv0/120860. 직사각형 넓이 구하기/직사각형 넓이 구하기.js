const solution = dots => {
    let x = Math.max(...dots.map(a => a[0])) - Math.min(...dots.map(a => a[0]));
    let y = Math.max(...dots.map(a => a[1])) - Math.min(...dots.map(a => a[1]));
    
    return x * y;
}