const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const clubTag = '#J2CL82CU';  // Dubble Down Club Tag

  // Fetch leaderboard data (modify this URL to actual Brawl Stars API endpoint)
  const response = await fetch(`https://api.brawlstars.com/v1/clubs/${clubTag}/leaderboard`);
  const data = await response.json();

  // Map the player data into the desired structure
  const players = data.items.map(player => ({
    name: player.name,
    tag: player.tag,
    trophies: player.trophies,
    rank: player.rank,
    favoriteBrawler: player.favoriteBrawler,
    profilePic: player.profilePic  // Assuming there's a field for profile pic
  }));

  return {
    statusCode: 200,
    body: JSON.stringify(players),
  };
};
