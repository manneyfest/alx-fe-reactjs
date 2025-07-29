// src/components/RecipeList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import FavoriteToggleButton from './FavoriteToggleButton'; // Import the toggle button
import './RecipeList.css';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);

  return (
    <div className="recipe-list-container">
      <h2>All Recipes</h2>
      {filteredRecipes.length === 0 ? (
        <p className="no-recipes-message">No recipes found matching your search. Try a different term!</p>
      ) : (
        <div className="recipe-grid">
          {filteredRecipes.map(recipe => (
            // The Link wraps the card content, and the button is inside but prevents default behavior
            <div key={recipe.id} className="recipe-card"> {/* Wrap Link in a div to place button easily */}
              <Link to={`/recipes/${recipe.id}`} className="recipe-card-link">
                <h3>{recipe.title}</h3>
                <p>{recipe.description.substring(0, 100)}...</p>
                <span className="view-details">View Details &raquo;</span>
              </Link>
              {/* Add the FavoriteToggleButton here, passing the recipe ID */}
              <FavoriteToggleButton recipeId={recipe.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;