// src/components/FavoriteToggleButton.jsx
import React from 'react';
import useRecipeStore from './recipeStore';
import './FavoriteToggleButton.css'; // We'll create this CSS file next

const FavoriteToggleButton = ({ recipeId }) => {
  // Get the favorites array and the actions to add/remove favorites
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  // Check if the current recipe is in favorites
  const isFavorite = favorites.includes(recipeId);

  const handleToggleFavorite = (event) => {
    event.preventDefault(); // Prevent navigating if this is inside a Link
    event.stopPropagation(); // Prevent event from bubbling up to parent Link

    if (isFavorite) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`favorite-toggle-button ${isFavorite ? 'is-favorite' : ''}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {/* You can use a heart icon here, for now, just text or an emoji */}
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
};

export default FavoriteToggleButton;