// src/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [playerTag, setPlayerTag] = useState('');

  const handleSearch = () => {
    if (playerTag) {
      onSearch(playerTag);  // Calls onSearch function passed as prop
    }
  };

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        placeholder="Enter Player Tag"
        value={playerTag}
        onChange={(e) => setPlayerTag(e.target.value)}
        style={styles.searchInput}
      />
      <button onClick={handleSearch} style={styles.searchButton}>
        Search
      </button>
    </div>
  );
};

const styles = {
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  searchInput: {
    padding: '10px',
    fontSize: '16px',
    width: '200px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  searchButton: {
    padding: '10px 20px',
    backgroundColor: '#ff7f00',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    marginLeft: '10px',
    cursor: 'pointer',
  },
};

export default SearchBar;
