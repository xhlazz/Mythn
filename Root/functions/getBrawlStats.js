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

  // Fetch leaderboard data for the club
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

  // Fetch additional stats for each player (e.g., trophies, rank, brawler)
  const playerStatsPromises = data.items.map(async (player) => {
    const playerStatsResponse = await fetch(`https://api.brawlstars.com/v1/players/${player.tag}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const playerStats = await playerStatsResponse.json();
    return {
      name: player.name,
      tag: player.tag,
      trophies: playerStats.trophies,
      rank: playerStats.rank,
      favoriteBrawler: playerStats.brawler,
      profilePic: playerStats.avatarUrl,  // Profile picture
    };
  });

  // Wait for all player stats to be fetched
  const players = await Promise.all(playerStatsPromises);

  return {
    statusCode: 200,
    body: JSON.stringify(players),
  };
};
