const solution = (id_pw, db) => {
    const [id, pw] = id_pw;
    const isIdExists = db.some(e => e.includes(id));
    const isPwCorrect = db.some(e => e.includes(id)&&e.includes(pw));

    if (!isIdExists) return 'fail';
    
    if (isIdExists && isPwCorrect) return 'login';
    return 'wrong pw';
}

