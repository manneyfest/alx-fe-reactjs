// src/App.jsx
import React, { useEffect } from 'react';
// Import your components
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
// Import your Zustand store
import useRecipeStore from './components/recipeStore';

// Import the main application CSS file
import './App.css';

function App() {
  // Access the `setRecipes` action from your Zustand store.
  // This action will be used to initially populate the recipe list.
  const setRecipes = useRecipeStore(state => state.setRecipes);

  // Use a useEffect hook to run code once when the component mounts.
  // This is a good place to load initial data, like mock recipes here,
  // or connect to a backend API in later tasks.
  useEffect(() => {
    // Define some mock initial recipes
    const mockInitialRecipes = [
      { id: 'mock1', title: 'Classic Tomato Pasta', description: 'Simple and delicious tomato pasta with fresh basil and Parmesan.' },
      { id: 'mock2', title: 'Quick Chicken Stir-fry', description: 'A fast and healthy stir-fry with tender chicken, colorful vegetables, and a savory sauce.' },
      { id: 'mock3', title: 'Hearty Lentil Soup', description: 'A comforting and nutritious soup packed with lentils, carrots, celery, and savory herbs.' },
      { id: 'mock4', title: 'Spicy Garlic Prawns', description: 'Succulent prawns cooked in a fiery garlic butter sauce, perfect with crusty bread.' },
    ];
    // Use the `setRecipes` action to populate the store with these mock recipes
    setRecipes(mockInitialRecipes);

    // The dependency array `[setRecipes]` means this effect will re-run only if `setRecipes` changes.
    // Since `setRecipes` is a stable function provided by Zustand's `create`, this effect effectively runs once on mount.
  }, [setRecipes]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Recipe Sharing App</h1>
        {/* You might add navigation or other header elements here later */}
      </header>

      <main className="app-main-content">
        {/* Render the AddRecipeForm component */}
        <AddRecipeForm />

        {/* Render the RecipeList component */}
        <RecipeList />
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} My Recipe App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;