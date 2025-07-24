//피로도
function solution(k, dungeons) {
    let maxNum =0;
    const visited = Array(dungeons.length).fill(false); 
    
    const dfs = (currentFatigue, count) => {
        maxNum = Math.max(maxNum, count); 
        for (let i = 0; i < dungeons.length; i++) {
            const [required, used] = dungeons[i]; 
            if (!visited[i] && currentFatigue >= required) {
                visited[i] = true;
                dfs(currentFatigue - used, count + 1);
                visited[i] = false;
      }
    }
  };

  dfs(k, 0);

  return maxNum;
}