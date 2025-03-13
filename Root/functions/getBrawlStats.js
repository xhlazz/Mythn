const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  // Extract player tag from query parameters
  const { tag } = event.queryStringParameters;

  // Replace with actual API URL for fetching stats based on player tag
  const response = await fetch(`https://api.brawlstars.com/v1/players/${tag}`);  // Modify with actual API endpoint
  const data = await response.json();

  if (!data) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Player not found!" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
