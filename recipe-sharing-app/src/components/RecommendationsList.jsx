// src/components/RecommendationsList.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // To link to recipe details
import useRecipeStore from './recipeStore';
import FavoriteToggleButton from './FavoriteToggleButton'; // Also useful here
import './RecommendationsList.css'; // We'll create this CSS file next

const RecommendationsList = () => {
  // Access the 'recommendations' state from the Zustand store
  const recommendations = useRecipeStore(state => state.recommendations);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations); // To manually trigger if needed

  // A simple way to re-generate if the list is empty, might be useful for testing
  React.useEffect(() => {
    if (recommendations.length === 0) {
      generateRecommendations();
    }
  }, [recommendations.length, generateRecommendations]);


  return (
    <div className="recommendations-list-container">
      <h2>Recommended Recipes</h2>
      {recommendations.length === 0 ? (
        <p className="no-recommendations-message">No recommendations available right now. Favorite some recipes to get started!</p>
      ) : (
        <div className="recommendations-grid">
          {recommendations.map(recipe => (
            <div key={recipe.id} className="recommendation-card">
              <Link to={`/recipes/${recipe.id}`} className="recommendation-card-link">
                <h3>{recipe.title}</h3>
                <p>{recipe.description.substring(0, 100)}...</p>
              </Link>
              {/* Allow favoring/unfavoring from here too */}
              <FavoriteToggleButton recipeId={recipe.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsList;