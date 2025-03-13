// functions/getBrawlStats.js
const axios = require('axios');

exports.handler = async function(event, context) {
  const BRAWL_API_KEY = process.env.BRAWL_API_KEY;  // Get the API key securely from environment variables

  // Get playerTag from query parameters
  const playerTag = event.queryStringParameters.playerTag; // Example: ?playerTag=PLAYER_TAG

  if (!playerTag) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Player tag is required" }),
    };
  }

  // Construct the API URL (replace with the actual API endpoint if necessary)
  const url = `https://api.brawlstars.com/v1/players/%23${playerTag}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${BRAWL_API_KEY}`,  // Use the API key here for authorization
      },
    });

    // Return data from the Brawl Stars API
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),  // Respond with the player stats data
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching data", details: error.message }),
    };
  }
};
