import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import HomePage from './components/HomePage';
import RecipeDetail from './components/RecipeDetail';
import AddRecipeForm from './components/AddRecipeForm'; // Import the new form component
import './index.css'; // Ensure your main CSS with Tailwind directives is imported

function App() {
  return (
    // BrowserRouter wraps the entire application to enable routing
    <BrowserRouter>
      {/* Routes define the different paths and the components to render */}
      <Routes>
        {/* Route for the Home Page */}
        <Route path="/" element={<HomePage />} />
        {/* Route for the Recipe Detail Page, with a dynamic ID parameter */}
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        {/* Route for the Add New Recipe Form */}
        <Route path="/add-recipe" element={<AddRecipeForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
