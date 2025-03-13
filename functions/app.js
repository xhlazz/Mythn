// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Leaderboard from './Leaderboard';
import PlayerProfile from './PlayerProfile';
import SearchBar from './SearchBar';

function App() {
  return (
    <Router>
      <div>
        <h1>Brawl Stars Stats</h1>
        <SearchBar onSearch={(playerTag) => console.log(playerTag)} />
        <Switch>
          <Route path="/" exact component={Leaderboard} />
          <Route path="/player/:playerTag" component={PlayerProfile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
