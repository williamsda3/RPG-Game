document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  authenticateUser(username, password);
});
function authenticateUser(username, password) {
  fetch('https://serverr-ztub.onrender.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Authentication failed');
    }
    return response.json();
  })
  .then(data => {
    const authToken = data.access_token;
    console.log('Authentication successful. Token:', authToken);

    // Save the authentication token (e.g., in localStorage)
    localStorage.setItem('authToken', authToken);
  })
  .catch(error => {
    console.error('Authentication failed:', error);
  });
}

function getLobbyPlayers() {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('Not authenticated. Please login first.');
    return;
  }

  fetch('https://serverr-ztub.onrender.com/lobby', {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
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
