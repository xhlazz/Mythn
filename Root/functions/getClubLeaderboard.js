const fetch = require('node-fetch');  // Ensure you have this installed in your functions folder

exports.handler = async function(event, context) {
  const clubTag = '#J2CL82CU';  // Your club tag
  const apiKey = process.env.IPAKEY;  // Access the new environment variable IPAKEY

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "API key is missing!" }),
    };
  }

  // Fetch leaderboard data for the club
  const leaderboardResponse = await fetch(`https://api.brawlstars.com/v1/clubs/${clubTag}/leaderboard`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,  // Use IPAKEY in the Authorization header
    },
  });

  if (!leaderboardResponse.ok) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to fetch leaderboard data!" }),
    };
  }

  const leaderboardData = await leaderboardResponse.json();

  // Fetch stats for each player
  const playerStatsPromises = leaderboardData.items.map(async (player) => {
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
      profilePic: playerStats.avatarUrl,
    };
  });

  // Wait for all player data to be fetched
  const players = await Promise.all(playerStatsPromises);

  return {
    statusCode: 200,
    body: JSON.stringify(players),
  };
};
