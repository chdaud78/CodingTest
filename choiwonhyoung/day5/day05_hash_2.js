function solution(genres, plays) {
    const playmap = new Map();
    const genremap = new Map();
    //장르별 곡수 총합, 곡정보 저장
    for(let i =0; i<genres.length; i++){
        const genre = genres[i];
        const play= plays[i];
        
        playmap.set(genre, (playmap.get(genre)||0)+play);
        if(!genremap.has(genre)){
            genremap.set(genre,[]);
        }
        genremap.get(genre).push({ index:i, play:play})
    }
    //장르별로 정렬
    const playnum = [...playmap.entries()]
        .sort((a,b)=>b[1]-a[1])
        .map(([genre])=>genre);
    
    //장르별 상위 2곡 정렬 및 추출
    const answer = [];

    for (const genre of playnum) {
        const songs = genremap.get(genre);

        songs.sort((a, b) => {
            if (b.play === a.play) return a.index - b.index;
            return b.play - a.play;
        });

        const topSongs = songs.slice(0, 2);
        for (const song of topSongs) {
            answer.push(song.index);
        }
    }

    return answer;    
}