// functions/getClubLeaderboard.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const response = await fetch('https://api.brawlstars.com/v1/club/your-club-id/players', {
      headers: { 'Authorization': `Bearer ${process.env.BRAWL_API_KEY}` },
    });
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.players),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch leaderboard' }),
    };
  }
};
