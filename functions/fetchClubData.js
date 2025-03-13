export async function handler(event, context) {
    const API_KEY = process.env.BRAWL_API_KEY;
    const CLUB_TAG = "J2CL82CU";  // Your club's tag

    const response = await fetch(`https://api.brawlstars.com/v1/clubs/%23${CLUB_TAG}`, {
        headers: { "Authorization": `Bearer ${API_KEY}` }
    });

    if (!response.ok) {
        return {
            statusCode: response.status,
            body: JSON.stringify({ error: "Failed to fetch club data" })
        };
    }

    const data = await response.json();
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
}
