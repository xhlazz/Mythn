document.getElementById("search-button").addEventListener("click", searchPlayer);

async function searchPlayer() {
  const tag = document.getElementById("search-bar").value;
  const response = await fetch(`/functions/getBrawlStats?tag=${tag}`);
  const data = await response.json();
  
  // Handle response and update the page with player stats
  const statsContainer = document.getElementById("leaderboard-container");
  statsContainer.innerHTML = `
    <h3>Player: ${data.name}</h3>
    <p>Trophies: ${data.trophies}</p>
    <p>Rank: ${data.rank}</p>
    <!-- Add more player stats as needed -->
  `;
}
