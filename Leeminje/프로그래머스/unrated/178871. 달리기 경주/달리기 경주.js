const solution = (players, callings) => {
    const playerMap = new Map();

    players.forEach((player, index) => playerMap.set(player, index));

    callings.forEach((e) => {
        const playerIndex = playerMap.get(e);

        if (playerIndex > 0) {
            const currentPlayer = players[playerIndex];
            players[playerIndex] = players[playerIndex - 1];
            players[playerIndex - 1] = currentPlayer;

            playerMap.set(currentPlayer, playerIndex - 1);
            playerMap.set(players[playerIndex], playerIndex);
        }
    });

    return players;
}