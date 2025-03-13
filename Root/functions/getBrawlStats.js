const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Get player tag from the query parameters
  const { tag } = event.queryStringParameters;

  // Fetch player stats (modify with your actual API endpoint)
  const response = await fetch(`https://api.brawlstars.com/v1/players/${tag}`);
  const data = await response.json();

  if (!data) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Player not found!" })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
