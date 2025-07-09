const solution = polynomial => {
    // 다행식 자르기
    const arr = polynomial.split(' + ');
    // x의 계수 구하기(-1과 1을 처리한다.)
    const xNum = arr
        .filter(e => e.includes('x'))
        .map(x => x.includes('-') ? parseInt(x)||-1 : parseInt(x)||1 ); 
        // parseInt와 Number의 처리 차이점?
    // 상수 값만 추출하기
    const num = arr.filter(e => !e.includes('x')).map(Number);

    // 계수의 합과 상수의 합계 구하기
    const xNumSum = xNum.reduce((a,c) => a+c, 0);
    const numSum = num.reduce((a,c) => a+c, 0);

    
    return [
        `${xNumSum===-1 ? '-x' : xNumSum===1 ? 'x' : xNumSum===0? '' : xNumSum+'x'}`,
        `${numSum===0 ? '' : numSum}`
    ].join(xNumSum&&numSum ? ' + ' : '');
}
