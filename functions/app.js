// src/App.js
import React from 'react';
import PlayerProfile from './PlayerProfile';

function App() {
  const playerTag = 'PLAYER_TAG'; // Replace with dynamic player tag if needed

  return (
    <div>
      <h1>Brawl Stars Stats</h1>
      <PlayerProfile playerTag={playerTag} />
    </div>
  );
}

export default App;
