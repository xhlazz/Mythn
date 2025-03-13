const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  // Replace with the actual API URL for your Brawl Stars club leaderboard
  const response = await fetch("https://api.brawlstars.com/v1/clubs/leaderboard"); // Modify this URL as per the actual API.
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
