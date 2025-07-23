// 소수 찾기

function solution(numbers) {
    const Arr= numbers.split("");
    const Makenum = new Set();
    
    function Makeset(first, second){
        if(first.length>0){
            Makenum.add(Number(first));
        }

    for(let i=0; i<second.length; i++){
        const next=first+second[i];
        const remain= second.slice(0,i).concat(second.slice(i+1));
        Makeset(next,remain);
        }
    }
    
    Makeset('',Arr);
    
    function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }
    
  let count = 0;
  for (const num of Makenum) {
    if (isPrime(num)) count++;
  }
    
   return count;
}