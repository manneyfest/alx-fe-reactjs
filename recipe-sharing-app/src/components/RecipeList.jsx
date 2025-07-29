// src/components/RecipeList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore'; // Your Zustand store
import './RecipeList.css';

const RecipeList = () => {
  // Access the 'filteredRecipes' state from the Zustand store
  // This component will now re-render whenever the filtered list changes.
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);

  return (
    <div className="recipe-list-container">
      <h2>All Recipes</h2>
      {/* Now check filteredRecipes.length instead of recipes.length */}
      {filteredRecipes.length === 0 ? (
        // Display a message if there are no filtered recipes
        <p className="no-recipes-message">No recipes found matching your search. Try a different term!</p>
      ) : (
        // If filtered recipes exist, display them in a grid
        <div className="recipe-grid">
          {/* Map over filteredRecipes instead of recipes */}
          {filteredRecipes.map(recipe => (
            <Link key={recipe.id} to={`/recipes/${recipe.id}`} className="recipe-card-link">
              <div className="recipe-card">
                <h3>{recipe.title}</h3>
                <p>{recipe.description.substring(0, 100)}...</p> {/* Show a truncated description */}
                <span className="view-details">View Details &raquo;</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;