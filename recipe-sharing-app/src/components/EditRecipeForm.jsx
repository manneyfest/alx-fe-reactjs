// src/components/EditRecipeForm.jsx
import React, { useState, useEffect } from 'react';
import useRecipeStore from './recipeStore'; // Your Zustand store
import './EditRecipeForm.css'; // We'll create this CSS file next

const EditRecipeForm = ({ recipe, onSave, onCancel }) => {
  // Get the updateRecipe action from the store
  const updateRecipe = useRecipeStore(state => state.updateRecipe);

  // Local state to manage form inputs, initialized with the current recipe data
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  // useEffect to update local state if the 'recipe' prop changes
  // This is important if this form could be reused for different recipes
  useEffect(() => {
    setTitle(recipe.title);
    setDescription(recipe.description);
  }, [recipe]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() === '' || description.trim() === '') {
      alert('Please ensure both title and description are filled.');
      return;
    }

    // Call the updateRecipe action with the updated recipe object
    // Ensure the ID remains the same!
    updateRecipe({
      id: recipe.id,
      title: title,
      description: description,
      // Keep any other existing properties of the original recipe
      ...recipe,
      // Overwrite title and description with new values
      title: title,
      description: description
    });

    onSave(); // Callback to tell the parent component (RecipeDetails) to exit editing mode
  };

  return (
    <div className="edit-recipe-form-container">
      <h3>Edit Recipe: {recipe.title}</h3>
      <form onSubmit={handleSubmit} className="edit-recipe-form">
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="6"
            className="form-textarea"
          />
        </label>
        <div className="form-actions">
          <button type="submit" className="save-button">Save Changes</button>
          <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;