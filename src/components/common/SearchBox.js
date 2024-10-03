import React from 'react';
import './SearchBox.css';

/**
 * SearchBox component - Provides an input field for searching
 * @param {string} searchQuery - Current search input value
 * @param {Function} setSearchQuery - Function to update the search query
 * @param {string} placeholder - Optional placeholder text for the search box
 */
const SearchBox = ({ searchQuery, setSearchQuery, placeholder }) => {
  return (
    <div className="search-box-container">
      <input
        type="text"
        placeholder={placeholder || "Search..."}  // Default placeholder if none is provided
        className="search-box"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
