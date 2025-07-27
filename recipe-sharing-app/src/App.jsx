
import React, { useEffect } from 'react';
import useRecipeStore from './stores/useRecipeStore'; // Adjust path if needed for your project
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import './App.css'; // For general app styling (ensure this file exists and has some basic styling)

function App() {
  // Get necessary state and actions from your Zustand store
  const allRecipes = useRecipeStore(state => state.recipes);
  const favorites = useRecipeStore(state => state.favorites); // Get the current favorites list (IDs)
  const addFavorite = useRecipeStore(state => state.addFavorite); // Action to add a favorite
  const removeFavorite = useRecipeStore(state => state.removeFavorite); // Action to remove a favorite

  // Get the initFirebaseAndLoadData action to ensure data is fetched when the app starts
  const initFirebaseAndLoadData = useRecipeStore(state => state.initFirebaseAndLoadData);
  const isDataLoaded = useRecipeStore(state => state.isDataLoaded); // To show loading state

  // This useEffect hook runs once when the component mounts to initialize Firebase and load data.
  // It replaces any mock recipe loading you might have had, as Firebase will now handle it.
  useEffect(() => {
    initFirebaseAndLoadData();
  }, [initFirebaseAndLoadData]); // Dependency array to ensure it only runs once

  // If data is still loading from Firebase, you might want to show a loading indicator
  if (!isDataLoaded) {
    return (
      <div className="loading-screen">
        <p>Loading recipes and user data...</p>
        {/* You could add a spinner or more elaborate loading animation here */}
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Recipe Sharing Application</h1>
        <nav>
          {/* You might have navigation links here (e.g., Home, Add Recipe, My Profile) */}
        </nav>
      </header>

      <main className="app-main-content">
        {/* Section to display all available recipes */}
        <section className="all-recipes-section">
          <h2>All Available Recipes</h2>
          <div className="recipe-grid">
            {allRecipes.length === 0 ? (
              <p className="no-recipes-message">No recipes available yet. Add some!</p>
            ) : (
              allRecipes.map(recipe => (
                <div key={recipe.id} className="recipe-card">
                  <h3>{recipe.title}</h3>
                  <p>{recipe.description}</p>
                  {recipe.imageUrl && (
                    <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
                  )}
                  {/* Conditional rendering for Add/Remove from Favorites button */}
                  {favorites.includes(recipe.id) ? (
                    // If the recipe ID is in the favorites array, show "Remove from Favorites"
                    <button
                      className="remove-favorite-btn"
                      onClick={() => removeFavorite(recipe.id)} // Call remove action
                    >
                      Remove from Favorites
                    </button>
                  ) : (
                    // Otherwise, show "Add to Favorites"
                    <button
                      className="add-favorite-btn"
                      onClick={() => addFavorite(recipe.id)} // Call add action
                    >
                      Add to Favorites
                    </button>
                  )}
                  {/* You could add a link to a recipe detail page here */}
                </div>
              ))
            )}
          </div>
        </section>

        <hr className="section-divider" />

        {/* Section for user-specific content: Favorites and Recommendations */}
        <section className="user-personalized-sections">
          <FavoritesList /> {/* Your new Favorites component */}
          <RecommendationsList /> {/* Your new Recommendations component */}
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} My Recipe App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;