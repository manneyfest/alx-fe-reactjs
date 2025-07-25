// src/components/AddRecipeForm.jsx
import { useState } from 'react';
import { useRecipeStore } from '../recipeStore'; // Adjust path if your store is elsewhere

const AddRecipeForm = () => {
  // Access the 'addRecipe' action from the Zustand store
  const addRecipe = useRecipeStore(state => state.addRecipe);

  // Local state for form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!title.trim() || !description.trim()) {
        alert('Please enter both title and description for the recipe.');
        return;
    }

    // Call the addRecipe action from the store with a new recipe object
    addRecipe({ id: Date.now(), title, description });

    // Clear the form fields after submission
    setTitle('');
    setDescription('');
  };

  return (
    <div style={{ marginBottom: '30px', border: '1px solid #eee', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description"
          rows="4"
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          required
        />
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;