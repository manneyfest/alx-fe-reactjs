// src/components/RecipeDetails.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import './RecipeDetails.css';

// Import the components for editing, deleting, and now favoriting
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import FavoriteToggleButton from './FavoriteToggleButton'; // Import the toggle button

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === recipeId)
  );

  const [isEditing, setIsEditing] = React.useState(false);

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
        <EditRecipeForm recipe={recipe} onSave={() => setIsEditing(false)} onCancel={() => setIsEditing(false)} />
      ) : (
        <div className="recipe-details-card">
          <h1>{recipe.title}</h1>
          <p className="recipe-description-details">{recipe.description}</p>
          {/* Place the FavoriteToggleButton near the title or actions */}
          <div className="recipe-detail-header">
            {/* You could put it here, or inside the actions div */}
          </div>

          <div className="recipe-actions">
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Edit Recipe
            </button>
            <DeleteRecipeButton recipeId={recipe.id} />
            {/* Add the FavoriteToggleButton here */}
            <FavoriteToggleButton recipeId={recipe.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;