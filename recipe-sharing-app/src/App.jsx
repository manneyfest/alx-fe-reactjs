// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import your components
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';       // <--- New: Import FavoritesList
import RecommendationsList from './components/RecommendationsList'; // <--- New: Import RecommendationsList

// Import your Zustand store
import useRecipeStore from './components/recipeStore';

// Import the main application CSS file
import './App.css';

function App() {
  const setRecipes = useRecipeStore(state => state.setRecipes);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations); // Get the action

  useEffect(() => {
    const mockInitialRecipes = [
      { id: 'mock1', title: 'Classic Tomato Pasta', description: 'Simple and delicious tomato pasta with fresh basil and Parmesan. Ingredients: Pasta, Tomatoes, Basil, Garlic, Olive Oil, Parmesan. Steps: Boil pasta, sauté garlic, add tomatoes, combine with pasta, garnish with basil and Parmesan.' },
      { id: 'mock2', title: 'Quick Chicken Stir-fry', description: 'A fast and healthy stir-fry with tender chicken, colorful vegetables, and a savory sauce. Ingredients: Chicken breast, Broccoli, Carrots, Bell peppers, Soy sauce, Ginger, Garlic. Steps: Cook chicken, add vegetables, add sauce, stir-fry until done.' },
      { id: 'mock3', title: 'Hearty Lentil Soup', description: 'A comforting and nutritious soup packed with lentils, carrots, celery, and savory herbs. Ingredients: Lentils, Carrots, Celery, Onions, Vegetable broth, Thyme, Bay leaf. Steps: Sauté vegetables, add lentils and broth, simmer until tender.' },
      { id: 'mock4', title: 'Spicy Garlic Prawns', description: 'Succulent prawns cooked in a fiery garlic butter sauce, perfect with crusty bread. Ingredients: Prawns, Garlic, Chili flakes, Butter, Lemon juice, Parsley. Steps: Sauté garlic and chili, add prawns, cook until pink, finish with butter and lemon.' },
    ];
    setRecipes(mockInitialRecipes);
  }, [setRecipes]);

  // Use useEffect to ensure initial recommendations are generated when recipes are set
  // This should run only once or when setRecipes (and thus recipes) changes
  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations, setRecipes]);


  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Recipe Sharing App</h1>
      </header>

      <main className="app-main-content">
        <Routes>
          {/* Home Route: Now includes FavoritesList and RecommendationsList */}
          <Route path="/" element={
            <>
              <SearchBar />
              <AddRecipeForm />
              {/* Place Favorites and Recommendations here */}
              <FavoritesList />          {/* <--- New: Add FavoritesList */}
              <RecommendationsList />    {/* <--- New: Add RecommendationsList */}
              <RecipeList />             {/* Keep RecipeList for all recipes or filtered results */}
            </>
          } />

          {/* Route for individual recipe details */}
          <Route path="/recipes/:recipeId" element={<RecipeDetails />} />

          {/* Optional: A catch-all route for 404 Not Found pages */}
          <Route path="*" element={
            <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.5em', color: '#dc3545' }}>
              <h2>404 - Page Not Found</h2>
              <p>The recipe you are looking for does not exist.</p>
              <button onClick={() => window.location.href = '/'} style={{ padding: '10px 20px', cursor: 'pointer', marginTop: '20px' }}>
                Go to Home
              </button>
            </div>
          } />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} My Recipe App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;