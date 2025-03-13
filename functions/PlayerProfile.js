// src/PlayerProfile.js
import React, { useState, useEffect } from 'react';

const PlayerProfile = ({ playerTag }) => {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const res = await fetch(`/api/getBrawlStats?playerTag=${playerTag}`);
        if (!res.ok) {
          throw new Error('Failed to fetch player data');
        }
        const data = await res.json();
        setPlayerData(data); // Set the player data in state
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    if (playerTag) {
      fetchPlayerData();
    }
  }, [playerTag]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>{playerData.name}'s Profile</h2>
      <p>Trophies: {playerData.trophies}</p>
      <p>Top Brawler: {playerData.topBrawler}</p>
      {/* Add more stats as needed */}
    </div>
  );
};

export default PlayerProfile;
