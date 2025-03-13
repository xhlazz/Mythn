const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjA1MTQyZjQzLTU1ZTktNDg1Yy1iN2ExLTI4MzY3YWI0ZjNjNiIsImlhdCI6MTc0MTgzNDI0MSwic3ViIjoiZGV2ZWxvcGVyLzJiOWI2YWQ2LTYxMGQtZWJjNS1iNWFmLTYxMTZlYjI2OTQ5MiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMC4wLjAuMCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.GQrjILi2OhGsU8MfGp7ymOWUM08ZwLOYKmIvl40j4MUybQYpcRFbR-Cu1d6l6yQNo-Xzv0UEW1rLpphtgA5LjQ';
const CLUB_TAG = 'J2CL82CU';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/club', async (req, res) => {
    try {
        const response = await fetch(`https://api.brawlstars.com/v1/clubs/%23${CLUB_TAG}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching club data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
