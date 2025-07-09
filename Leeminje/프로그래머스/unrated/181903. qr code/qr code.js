function solution(q, r, code) {
    return [...code].reduce((num, cnt, i) => {
        return i%q === r ? num+cnt : num
    }, "")
}