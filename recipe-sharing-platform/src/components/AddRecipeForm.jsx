import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link to navigate back to home

const AddRecipeForm = () => {
  // State variables for form inputs
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState(''); // Added summary field as per HomePage card
  const [image, setImage] = useState(''); // Added image URL field
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  // State variables for validation errors
  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)

    const newErrors = {};
    let isValid = true;

    // --- Validation Logic ---
    if (!title.trim()) {
      newErrors.title = 'Recipe title is required.';
      isValid = false;
    }
    if (!summary.trim()) {
      newErrors.summary = 'Recipe summary is required.';
      isValid = false;
    }
    if (!image.trim()) {
      newErrors.image = 'Image URL is required.';
      isValid = false;
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(image.trim())) {
      newErrors.image = 'Please enter a valid image URL (jpg, jpeg, png, gif).';
      isValid = false;
    }
    if (!ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required.';
      isValid = false;
    } else if (ingredients.split('\n').filter(line => line.trim() !== '').length < 2) {
      newErrors.ingredients = 'Please list at least two ingredients (one per line).';
      isValid = false;
    }
    if (!instructions.trim()) {
      newErrors.instructions = 'Instructions are required.';
      isValid = false;
    } else if (instructions.split('\n').filter(line => line.trim() !== '').length < 2) {
      newErrors.instructions = 'Please list at least two steps (one per line).';
      isValid = false;
    }
    // --- End Validation Logic ---

    setErrors(newErrors); // Update errors state

    if (isValid) {
      // If validation passes, construct the new recipe object
      const newRecipe = {
        // In a real app, you'd generate a unique ID (e.g., using uuid library or from a backend)
        id: Date.now(), // Simple unique ID for mock data
        title: title.trim(),
        summary: summary.trim(),
        image: image.trim(),
        // Split ingredients and instructions by new line and trim whitespace for cleaner data
        ingredients: ingredients.split('\n').map(item => item.trim()).filter(item => item !== ''),
        instructions: instructions.split('\n').map(item => item.trim()).filter(item => item !== '')
      };

      console.log('New Recipe Submitted:', newRecipe);
      // In a real application, you would send this data to a backend API (e.g., using fetch or axios)
      // For this project, we'll just log it to the console and show a success message.

      setSubmissionMessage('Recipe added successfully! Check console for data.');
      // Optionally, clear the form fields after successful submission
      setTitle('');
      setSummary('');
      setImage('');
      setIngredients('');
      setInstructions('');
      setErrors({}); // Clear any previous errors
    } else {
      setSubmissionMessage('Please correct the errors in the form.');
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      <Link 
        to="/" 
        className="text-blue-600 hover:text-blue-800 text-lg font-semibold mb-6 inline-block 
                   transition duration-300 ease-in-out transform hover:translate-x-1"
      >
        &larr; Back to Recipes
      </Link>

      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mt-4 mb-8">
        Add a New Recipe
      </h1>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10 space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-gray-700 text-lg font-medium mb-2">
            Recipe Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-400`}
            placeholder="e.g., Delicious Apple Pie"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Summary Field */}
        <div>
          <label htmlFor="summary" className="block text-gray-700 text-lg font-medium mb-2">
            Recipe Summary:
          </label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows="3"
            className={`w-full p-3 border ${errors.summary ? 'border-red-500' : 'border-gray-300'} rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y`}
            placeholder="A short description of the recipe..."
          ></textarea>
          {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
        </div>

        {/* Image URL Field */}
        <div>
          <label htmlFor="image" className="block text-gray-700 text-lg font-medium mb-2">
            Image URL:
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={`w-full p-3 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-400`}
            placeholder="https://example.com/your-image.jpg"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>

        {/* Ingredients Field */}
        <div>
          <label htmlFor="ingredients" className="block text-gray-700 text-lg font-medium mb-2">
            Ingredients (one per line):
          </label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="6"
            className={`w-full p-3 border ${errors.ingredients ? 'border-red-500' : 'border-gray-300'} rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y`}
            placeholder="e.g.,&#10;2 cups flour&#10;1 cup sugar&#10;3 eggs"
          ></textarea>
          {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
        </div>

        {/* Instructions Field */}
        <div>
          <label htmlFor="instructions" className="block text-gray-700 text-lg font-medium mb-2">
            Preparation Steps (one per line):
          </label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows="8"
            className={`w-full p-3 border ${errors.instructions ? 'border-red-500' : 'border-gray-300'} rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y`}
            placeholder="e.g.,&#10;1. Preheat oven to 350°F.&#10;2. Mix wet ingredients..."
          ></textarea>
          {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
        </div>

        {/* Submission Message */}
        {submissionMessage && (
          <p className={`text-center font-bold ${isValid ? 'text-green-600' : 'text-red-600'} mt-4`}>
            {submissionMessage}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg 
                     hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 
                     transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
