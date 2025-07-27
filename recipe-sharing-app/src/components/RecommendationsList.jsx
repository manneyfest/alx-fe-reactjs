import React, { useEffect } from 'react';
import useRecipeStore from '../stores/useRecipeStore'; // Adjust path if needed
import './RecommendationsList.css'; // This is for styling, we'll create it next

const RecommendationsList = () => {
  // 1. Get state and actions from the Zustand store
  const recommendations = useRecipeStore(state => state.recommendations); // Array of recommended full recipe objects
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations); // Action to generate recommendations
  const addFavorite = useRecipeStore(state => state.addFavorite); // Action to add a favorite

  // 2. Use useEffect to trigger recommendation generation when the component mounts
  // This ensures recommendations are fresh when the user sees them.
  useEffect(() => {
    // Calling get().generateRecommendations() here ensures it uses the *latest*
    // state (favorites, recipes) for calculation after data is loaded.
    generateRecommendations();
    // Dependency array: generateRecommendations is a stable function provided by Zustand's create.
    // If you had more complex logic that depended on `favorites` array *identity* changing,
    // you might add `useRecipeStore(state => state.favorites)` to the dependency array,
    // but for simple re-evaluation, the action call itself is sufficient here.
  }, [generateRecommendations]); // Ensures the effect runs when generateRecommendations is available

  // 3. Render the component
  return (
    <div className="recommendations-list-container">
      <h2>Recommended Recipes For You</h2>
      {recommendations.length === 0 ? (
        // Display a message if no recommendations
        <p className="no-recommendations-message">
          No specific recommendations right now. Try favoriting some recipes to help us learn your taste!
        </p>
      ) : (
        // Display the grid of recommended recipes
        <div className="recommendations-grid">
          {recommendations.map(recipe => (
            <div key={recipe.id} className="recommended-recipe-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              {/* Optional: Display recipe image if available */}
              {recipe.imageUrl && (
                <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
              )}
              {/* Button to add to favorites from recommendations */}
              <button
                className="add-favorite-btn"
                onClick={() => addFavorite(recipe.id)} // Calls the Zustand action
              >
                Add to Favorites
              </button>
              {/* You might add a link here to view the recipe's full details page */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsList;