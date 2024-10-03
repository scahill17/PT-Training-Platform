import React from 'react';
import './SearchBox.css'; // Assuming we separate the styles into a new file

const SearchBox = ({ searchQuery, setSearchQuery, placeholder }) => {
  return (
    <div className="search-box-container">
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        className="search-box"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
