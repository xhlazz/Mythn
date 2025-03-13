document.addEventListener("DOMContentLoaded", () => {
  // Call the function to load leaderboard data when page loads
  fetchLeaderboard();
});

// Fetch leaderboard data for top players in the club
async function fetchLeaderboard() {
  const response = await fetch(`/functions/getClubLeaderboard`);
  const leaderboard = await response.json();

  const leaderboardContainer = document.getElementById("leaderboard-container");
  leaderboardContainer.innerHTML = `<h2>Top Players of Dubble Down Club</h2>`;

  leaderboard.forEach((player, index) => {
    if (index < 30) {
      const playerDiv = document.createElement("div");
      playerDiv.classList.add("player-card");

      // Add player details: name, trophies, rank, etc.
      playerDiv.innerHTML = `
        <img src="${player.profilePic}" alt="${player.name}'s profile" class="profile-pic"/>
        <h3>${player.name}</h3>
        <p>Trophies: ${player.trophies}</p>
        <p>Rank: ${player.rank}</p>
        <p>Favorite Brawler: ${player.favoriteBrawler}</p>
        <div class="badge">${player.tag === '#PV0L0828C' || player.name === 'xhlazz' ? "Creator of the Website" : ''}</div>
      `;
      leaderboardContainer.appendChild(playerDiv);
    }
  });
}
