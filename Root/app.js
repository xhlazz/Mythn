document.getElementById("search-button").addEventListener("click", searchPlayer);

async function searchPlayer() {
  const tag = document.getElementById("search-bar").value;
  const response = await fetch(`/functions/getBrawlStats?tag=${tag}`);
  const data = await response.json();

  const statsContainer = document.getElementById("leaderboard-container");
  statsContainer.innerHTML = `
    <h3>${data.name}</h3>
    <p>Trophies: ${data.trophies}</p>
    <p>Rank: ${data.rank}</p>
    <p>Wins: ${data.wins}</p>
    ${data.tag === '#PV0L0828C' || data.name === 'xhlazz' ? "<p><strong>Creator of the Website</strong></p>" : ''}
  `;
}

// Function to fetch club leaderboard
async function fetchLeaderboard() {
  const response = await fetch(`/functions/getClubLeaderboard`);
  const leaderboard = await response.json();

  const leaderboardContainer = document.getElementById("leaderboard-container");
  leaderboardContainer.innerHTML = `<h2>Club Leaderboard</h2>`;

  leaderboard.forEach((player) => {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("player-card");

    // Add player name and stats
    playerDiv.innerHTML = `
      <h3>${player.name}</h3>
      <p>Trophies: ${player.trophies}</p>
      <p>Rank: ${player.rank}</p>
      ${player.tag === '#PV0L0828C' || player.name === 'xhlazz' ? "<p><strong>Creator of the Website</strong></p>" : ''}
    `;
    leaderboardContainer.appendChild(playerDiv);
  });
}

// Call the fetchLeaderboard function when the page loads
fetchLeaderboard();
