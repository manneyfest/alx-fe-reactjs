// src/components/AddRecipeForm.jsx
import React, { useState } from 'react';
// Adjust the import path for your store.
import useRecipeStore from '../stores/useRecipeStore';
import './AddRecipeForm.css'; // We'll create this CSS file next

const AddRecipeForm = () => {
  // Access the 'addRecipe' action from the Zustand store
  // This function will be called to update the global state.
  const addRecipe = useRecipeStore(state => state.addRecipe);

  // Local state to manage the input values of the form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Function to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default browser form submission behavior (page reload)

    // Basic validation: ensure title and description are not empty
    if (title.trim() === '' || description.trim() === '') {
      alert('Please enter both a title and a description for the recipe.');
      return; // Stop the function if validation fails
    }

    // Call the `addRecipe` action from the Zustand store
    // We create a simple unique ID using `Date.now()`. This will be replaced by
    // database-generated IDs in later tasks (e.g., when integrating Firebase).
    addRecipe({
      id: Date.now().toString(), // Simple unique ID for now
      title: title,
      description: description
    });

    // Clear the form fields after successful submission
    setTitle('');
    setDescription('');
  };

  return (
    <div className="add-recipe-form-container">
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="add-recipe-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          required // HTML5 validation: field must not be empty
          className="form-input"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description (e.g., ingredients, steps)"
          required // HTML5 validation: field must not be empty
          rows="4" // Provides more vertical space for typing description
          className="form-textarea"
        />
        <button type="submit" className="submit-button">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipeForm;