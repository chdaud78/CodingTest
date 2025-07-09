const solution =emergency => {
    let arrSort = emergency.slice().sort((a,b)=>b-a);
    return emergency.map(e => arrSort.indexOf(e) + 1);
}