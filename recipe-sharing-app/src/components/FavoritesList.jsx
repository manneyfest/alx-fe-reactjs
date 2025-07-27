import React from 'react';
import useRecipeStore from '../stores/useRecipeStore'; // Adjust path if needed
import './FavoritesList.css'; // This is for styling, we'll create it next

const FavoritesList = () => {
  // 1. Get state and actions from the Zustand store
  const favorites = useRecipeStore(state => state.favorites); // Array of favorite recipe IDs
  const recipes = useRecipeStore(state => state.recipes);     // All available recipes
  const removeFavorite = useRecipeStore(state => state.removeFavorite); // Action to remove a favorite

  // 2. Derive the full recipe objects for the favorited IDs
  // We map each favorite ID to its corresponding recipe object.
  // .filter(Boolean) is used to remove any `undefined` entries in case a favorite ID
  // somehow doesn't match an existing recipe (e.g., if a recipe was deleted).
  const favoriteRecipes = favorites
    .map(id => recipes.find(recipe => recipe.id === id))
    .filter(Boolean); // Filters out any null/undefined entries

  // 3. Render the component
  return (
    <div className="favorites-list-container">
      <h2>My Favorite Recipes</h2>
      {favoriteRecipes.length === 0 ? (
        // Display a message if no favorites
        <p className="no-favorites-message">
          You haven't added any favorite recipes yet. Click the "Add to Favorites" button on any recipe to get started!
        </p>
      ) : (
        // Display the grid of favorite recipes
        <div className="favorites-grid">
          {favoriteRecipes.map(recipe => (
            <div key={recipe.id} className="favorite-recipe-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              {/* Optional: Display recipe image if available */}
              {recipe.imageUrl && (
                <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
              )}
              {/* Button to remove from favorites */}
              <button
                className="remove-favorite-btn"
                onClick={() => removeFavorite(recipe.id)} // Calls the Zustand action
              >
                Remove from Favorites
              </button>
              {/* You might add a link here to view the recipe's full details page */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;