// functions/getBrawlStats.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { playerTag } = event.queryStringParameters;

  try {
    const response = await fetch(`https://api.brawlstars.com/v1/players/${playerTag}`, {
      headers: { 'Authorization': `Bearer ${process.env.BRAWL_API_KEY}` },
    });
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch player stats' }),
    };
  }
};
