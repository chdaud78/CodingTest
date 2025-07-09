function solution(dots) {
    const isDots = dots => dots.every(([x, y]) => x >= 0 && x <= 100 && y >= 0 && y <= 100);
    const calculateSlope = (dot1, dot2) => (dot2[1] - dot1[1]) / (dot2[0] - dot1[0]);
    const combinations = [
        [dots[0], dots[1], dots[2], dots[3]],
        [dots[0], dots[2], dots[1], dots[3]],
        [dots[0], dots[3], dots[1], dots[2]],
    ];

    if (!isDots(dots)) return 1;

    for (const comb of combinations) {
        const slope1 = calculateSlope(comb[0], comb[1]);
        const slope2 = calculateSlope(comb[2], comb[3]);
        if (slope1 === slope2) return 1;
    }
    
    return 0;
}
