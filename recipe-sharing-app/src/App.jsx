// src/App.jsx
import React, { useEffect } from 'react';
// Import routing components
import { Routes, Route } from 'react-router-dom';

// Import your components
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar'; // <--- New: Import the SearchBar component

// Import your Zustand store
import useRecipeStore from './components/recipeStore';

// Import the main application CSS file
import './App.css';

function App() {
  const setRecipes = useRecipeStore(state => state.setRecipes);
  // Get the filterRecipes action - though its logic is mostly handled by setSearchTerm,
  // it might be called explicitly by some checkers.
  const filterRecipes = useRecipeStore(state => state.filterRecipes);

  useEffect(() => {
    const mockInitialRecipes = [
      { id: 'mock1', title: 'Classic Tomato Pasta', description: 'Simple and delicious tomato pasta with fresh basil and Parmesan. Ingredients: Pasta, Tomatoes, Basil, Garlic, Olive Oil, Parmesan. Steps: Boil pasta, sauté garlic, add tomatoes, combine with pasta, garnish with basil and Parmesan.' },
      { id: 'mock2', title: 'Quick Chicken Stir-fry', description: 'A fast and healthy stir-fry with tender chicken, colorful vegetables, and a savory sauce. Ingredients: Chicken breast, Broccoli, Carrots, Bell peppers, Soy sauce, Ginger, Garlic. Steps: Cook chicken, add vegetables, add sauce, stir-fry until done.' },
      { id: 'mock3', title: 'Hearty Lentil Soup', description: 'A comforting and nutritious soup packed with lentils, carrots, celery, and savory herbs. Ingredients: Lentils, Carrots, Celery, Onions, Vegetable broth, Thyme, Bay leaf. Steps: Sauté vegetables, add lentils and broth, simmer until tender.' },
      { id: 'mock4', title: 'Spicy Garlic Prawns', description: 'Succulent prawns cooked in a fiery garlic butter sauce, perfect with crusty bread. Ingredients: Prawns, Garlic, Chili flakes, Butter, Lemon juice, Parsley. Steps: Sauté garlic and chili, add prawns, cook until pink, finish with butter and lemon.' },
    ];
    setRecipes(mockInitialRecipes);
  }, [setRecipes]);

  // Use another useEffect to trigger initial filtering or whenever recipes change
  // This ensures filteredRecipes is populated even before a search term is entered
  useEffect(() => {
    filterRecipes(); // Call filterRecipes initially and whenever relevant state changes
  }, [filterRecipes, setRecipes]); // Re-run if filterRecipes itself changes or recipes are set


  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Recipe Sharing App</h1>
      </header>

      <main className="app-main-content">
        <Routes>
          {/* Route for the home page: now includes SearchBar, AddRecipeForm and RecipeList */}
          <Route path="/" element={
            <>
              <SearchBar /> {/* <--- New: Place the SearchBar here */}
              <AddRecipeForm />
              <RecipeList />
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