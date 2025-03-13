const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Club tag for your Brawl Stars club
  const clubTag = '#J2CL82CU';

  // Fetch leaderboard data (modify with your actual API endpoint)
  const response = await fetch(`https://api.brawlstars.com/v1/clubs/${clubTag}/leaderboard`);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
