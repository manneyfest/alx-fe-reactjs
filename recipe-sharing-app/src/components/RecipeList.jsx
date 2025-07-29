// src/components/RecipeList.jsx
import React from 'react';
// Adjust the import path for your store. It's usually one level up from components.
import useRecipeStore from '../stores/useRecipeStore';
import './RecipeList.css'; // We'll create this CSS file next

const RecipeList = () => {
  // Access the 'recipes' state from the Zustand store
  // When 'recipes' in the store changes, this component will re-render.
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div className="recipe-list-container">
      <h2>All Recipes</h2>
      {recipes.length === 0 ? (
        // Display a message if there are no recipes
        <p className="no-recipes-message">No recipes added yet. Be the first!</p>
      ) : (
        // If recipes exist, display them in a grid
        <div className="recipe-grid">
          {recipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              {/* In later tasks, you might add more details, images, or buttons here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;