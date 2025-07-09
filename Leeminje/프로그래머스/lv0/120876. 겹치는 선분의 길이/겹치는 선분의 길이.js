const solution = lines => {
    const arr = new Map();

    lines.forEach(([start, end]) => {
        for (let i = start; i < end; i++) 
            arr.set(i, (arr.get(i) || 0) + 1);
    });

    return Array.from(arr.values()).filter(count => count >= 2).length;
}