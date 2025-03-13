// src/Leaderboard.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/.netlify/functions/getClubLeaderboard');  // Function URL
        const data = await res.json();
        setLeaderboard(data.sort((a, b) => b.trophies - a.trophies)); // Sort by trophies
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const handlePlayerClick = (playerTag) => {
    history.push(`/player/${playerTag}`);  // Navigate to player profile page
  };

  if (loading) return <div>Loading leaderboard...</div>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((player, index) => (
          <li key={player.tag} onClick={() => handlePlayerClick(player.tag)}>
            <div>
              <strong>{index + 1}. {player.name}</strong> - {player.trophies} trophies
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
