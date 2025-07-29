// src/components/FavoritesList.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // To link to recipe details
import useRecipeStore from './recipeStore';
import FavoriteToggleButton from './FavoriteToggleButton'; // We'll create this next
import './FavoritesList.css'; // We'll create this CSS file next

const FavoritesList = () => {
  // Get the list of all recipes and favorite IDs
  const recipes = useRecipeStore(state => state.recipes);
  const favoriteIds = useRecipeStore(state => state.favorites);

  // Map favorite IDs to actual recipe objects
  const favoriteRecipes = favoriteIds.map(id =>
    recipes.find(recipe => recipe.id === id)
  ).filter(Boolean); // Filter out any undefined if a favorite ID no longer exists

  return (
    <div className="favorites-list-container">
      <h2>My Favorite Recipes</h2>
      {favoriteRecipes.length === 0 ? (
        <p className="no-favorites-message">You haven't favorited any recipes yet. Click the heart icon on a recipe to add it!</p>
      ) : (
        <div className="favorites-grid">
          {favoriteRecipes.map(recipe => (
            <div key={recipe.id} className="favorite-card">
              <Link to={`/recipes/${recipe.id}`} className="favorite-card-link">
                <h3>{recipe.title}</h3>
                <p>{recipe.description.substring(0, 100)}...</p>
              </Link>
              {/* Add a button to remove from favorites directly on the card */}
              <FavoriteToggleButton recipeId={recipe.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;