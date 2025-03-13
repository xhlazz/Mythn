const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const clubTag = '#J2CL82CU';  // Dubble Down Club Tag
  const apiKey = process.env.BRAWL_API_KEY;  // Access API key from Netlify environment variable

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "API key is missing!" }),
    };
  }

  // Fetch leaderboard data (modify this URL to actual Brawl Stars API endpoint)
  const response = await fetch(`https://api.brawlstars.com/v1/clubs/${clubTag}/leaderboard`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,  // Include API key in Authorization header
    },
  });

  if (!response.ok) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to fetch leaderboard data!" }),
    };
  }

  const data = await response.json();

  // Map the player data into the desired structure
  const players = data.items.map(player => ({
    name: player.name,
    tag: player.tag,
    trophies: player.trophies,
    rank: player.rank,
    favoriteBrawler: player.favoriteBrawler,
    profilePic: player.profilePic,  // Assuming there's a field for profile pic
  }));

  return {
    statusCode: 200,
    body: JSON.stringify(players),
  };
};
