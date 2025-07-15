function solution(phone_book) {
    const set = new Set(phone_book)
        for (let number of phone_book) {
            for(let i = 1; i < number.length; i++){
                const text = number.slice(0,i);
                if(set.has(text)){
                    return false;
                }
            }
        }
    return true;
}