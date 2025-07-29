// src/components/SearchBar.jsx
import React from 'react';
import useRecipeStore from './recipeStore'; // Your Zustand store
import './SearchBar.css'; // We'll create this CSS file next

const SearchBar = () => {
  // Access the setSearchTerm action from the Zustand store
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);

  // The onChange event handler updates the store's searchTerm
  // as the user types.
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search recipes by title..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;