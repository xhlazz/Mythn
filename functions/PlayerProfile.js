// src/PlayerProfile.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PlayerProfile = () => {
  const { playerTag } = useParams();  // Get the player tag from the URL
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const res = await fetch(`/.netlify/functions/getBrawlStats?playerTag=${playerTag}`);  // Function URL
        const data = await res.json();
        setPlayerData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [playerTag]);

  if (loading) return <div>Loading player stats...</div>;

  return (
    <div>
      <h2>{playerData.name}'s Profile</h2>
      <p>Trophies: {playerData.trophies}</p>
      {/* Display more player stats here */}
    </div>
  );
};

export default PlayerProfile;
