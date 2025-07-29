// src/components/RecipeDetails.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Will use in Step 3 for routing
import useRecipeStore from './recipeStore'; // Your Zustand store
import './RecipeDetails.css'; // We'll create this CSS file next

// Import the components we'll create later for editing and deleting
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  // useParams() hook from react-router-dom allows us to read parameters from the URL.
  // We'll configure our route in App.jsx to pass the recipe ID as a parameter.
  const { recipeId } = useParams();
  const navigate = useNavigate(); // For programmatic navigation (e.g., back button)

  // Get the recipe data from the store based on the recipeId from the URL
  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === recipeId)
  );

  // We'll manage editing state locally within this component
  const [isEditing, setIsEditing] = React.useState(false);

  // Handle case where recipe is not found (e.g., invalid URL)
  if (!recipe) {
    return (
      <div className="recipe-details-container">
        <p className="not-found-message">Recipe not found!</p>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="recipe-details-container">
      <button onClick={() => navigate('/')} className="back-button">
        &laquo; Back to All Recipes
      </button>

      {isEditing ? (
        // If in editing mode, show the EditRecipeForm
        <EditRecipeForm recipe={recipe} onSave={() => setIsEditing(false)} onCancel={() => setIsEditing(false)} />
      ) : (
        // Otherwise, show the recipe details
        <div className="recipe-details-card">
          <h1>{recipe.title}</h1>
          <p className="recipe-description-details">{recipe.description}</p>
          {/* You could add more details like ingredients, instructions, image here */}

          <div className="recipe-actions">
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Edit Recipe
            </button>
            {/* The DeleteRecipeButton component will handle its own logic */}
            <DeleteRecipeButton recipeId={recipe.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;