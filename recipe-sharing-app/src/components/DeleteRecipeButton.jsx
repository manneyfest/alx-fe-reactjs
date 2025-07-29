// src/components/DeleteRecipeButton.jsx
import React from 'react';
import useRecipeStore from './recipeStore'; // Your Zustand store
import { useNavigate } from 'react-router-dom'; // To redirect after deletion
import './DeleteRecipeButton.css'; // We'll create this CSS file next

const DeleteRecipeButton = ({ recipeId }) => {
  // Get the deleteRecipe action from the store
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate(); // For redirection

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId);
      // After deleting, navigate back to the main recipe list
      navigate('/');
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;