  function joinLobby() {
    const playerId = 1; // Replace with actual player ID
  
    fetch(`https://serverr-ztub.onrender.com/players/${playerId}/join_lobby`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Joined lobby:', data);
      })
      .catch(error => console.error('Error joining lobby:', error));
  }
  
  function getLobbyPlayers() {
    fetch('https://serverr-ztub.onrender.com/lobby')
      .then(response => response.json())
      .then(data => {
        console.log('Lobby players:', data);
        // Update UI to display the list of lobby players
        const lobbyPlayerList = document.getElementById('lobbyPlayerList');
        lobbyPlayerList.innerHTML = '';
  
        data.forEach(player => {
          const listItem = document.createElement('li');
          listItem.textContent = `Player ${player.id} - HP: ${player.hp}, ATK: ${player.atk}`;
          lobbyPlayerList.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error getting lobby players:', error));
  }
  
  function selectPlayerForBattle() {
    // Implement logic to allow player to select another player for battle
    // This can involve presenting a list of players in the lobby and allowing the player to choose an opponent
    alert('Player selected for battle!');  // Replace with your actual logic
  }
  