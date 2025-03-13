document.addEventListener("DOMContentLoaded", () => {
  checkApiKey();  // Check if the API key works when the page loads
  fetchLeaderboard();  // Fetch the leaderboard
});

// Function to check if the IPA key is working
async function checkApiKey() {
  const response = await fetch('/functions/validateKey');
  const result = await response.json();
  
  const apiStatusContainer = document.getElementById("api-status");
  if (result.message === "Correctly used key!") {
    apiStatusContainer.textContent = "Correctly used key!";
    apiStatusContainer.style.color = "green";
  } else {
    apiStatusContainer.textContent = "Incorrect key!";
    apiStatusContainer.style.color = "red";
  }
}

// Fetch leaderboard data for top players in the club
async function fetchLeaderboard() {
  const response = await fetch(`/functions/getClubLeaderboard`);
  const leaderboard = await response.json();

  const leaderboardContainer = document.getElementById("leaderboard-container");
  leaderboardContainer.innerHTML = `<h2>Top Players of Dubble Down Club</h2>`;

  leaderboard.forEach((player, index) => {
    if (index < 30) {  // Limit to Top 30 players
      const playerDiv = document.createElement("div");
      playerDiv.classList.add("player-card");

      // Add player details: name, trophies, rank, favorite brawler, etc.
      playerDiv.innerHTML = `
        <img src="${player.profilePic}" alt="${player.name}'s profile" class="profile-pic"/>
        <h3>${player.name}</h3>
        <p>Trophies: ${player.trophies}</p>
        <p>Rank: ${player.rank}</p>
        <p>Favorite Brawler: ${player.favoriteBrawler}</p>
      `;

      // Add "Creator of the Website" below creator's name
      if (player.tag === "#PV0L0828C" || player.name === "xhlazz") {
        const creatorTag = document.createElement("p");
        creatorTag.classList.add("creator-tag");
        creatorTag.textContent = "Creator of the Website";
        playerDiv.appendChild(creatorTag);
      }

      leaderboardContainer.appendChild(playerDiv);
    }
  });
}
