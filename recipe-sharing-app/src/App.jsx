import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate, Link } from 'react-router-dom';
import { useRecipeStore } from './components/recipeStore'; // CORRECTED PATH: Now imports from './components/recipeStore'

// --- Main App Component ---
function App() {
  const initFirebaseAndLoadData = useRecipeStore((state) => state.initFirebaseAndLoadData);
  const isDataLoaded = useRecipeStore((state) => state.isDataLoaded);
  const userId = useRecipeStore((state) => state.userId);

  // Initialize Firebase and load data when the component mounts
  useEffect(() => {
    initFirebaseAndLoadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  // Show a loading state until data is loaded from Firestore
  if (!isDataLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="text-white text-2xl font-semibold animate-pulse">Loading recipes...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
        {/* Navigation Bar */}
        <nav className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <Link to="/" className="text-2xl font-bold text-white hover:text-indigo-200 transition duration-300">
            Recipe Share App
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition duration-300 shadow">
              All Recipes
            </Link>
            <Link to="/add" className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition duration-300 shadow">
              Add New Recipe
            </Link>
          </div>
        </nav>

        {/* Display User ID */}
        {userId && (
          <div className="mb-4 text-center text-sm text-white">
            Your User ID: <span className="font-mono bg-white bg-opacity-20 px-2 py-1 rounded-md select-all">{userId}</span>
          </div>
        )}

        {/* React Router Routes */}
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/add" element={<AddRecipeForm />} />
          {/* Route for displaying individual recipe details */}
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          {/* Route for editing a specific recipe */}
          <Route path="/recipes/:id/edit" element={<EditRecipeForm />} />
          {/* Catch-all for unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

// --- Components ---

/**
 * RecipeList Component
 * Displays a list of all recipes fetched from the Zustand store.
 */
function RecipeList() {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div className="max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-xl p-6">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Your Recipes</h2>
      {recipes.length === 0 ? (
        <p className="text-center text-lg text-white">No recipes yet. Start by adding a new one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * RecipeCard Component
 * A small card displaying a recipe's title and a brief description,
 * with a link to its detailed view.
 */
function RecipeCard({ recipe }) {
  return (
    <div className="bg-white bg-opacity-15 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white border-opacity-20">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">{recipe.title}</h3>
        <p className="text-gray-200 text-sm mb-4 line-clamp-3">{recipe.description}</p>
        <Link
          to={`/recipes/${recipe.id}`}
          className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md font-medium text-sm transition duration-300 shadow"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

/**
 * RecipeDetails Component
 * Displays detailed information about a single recipe.
 * Includes buttons to edit or delete the recipe.
 */
function RecipeDetails() {
  const { id } = useParams(); // Get the recipe ID from the URL parameter
  const navigate = useNavigate();
  const recipes = useRecipeStore((state) => state.recipes);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  // Find the recipe in the store's `recipes` array
  const recipe = recipes.find((r) => r.id === id);

  // State to control the visibility of the confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Handle case where the recipe is not found
  if (!recipe) {
    return (
      <div className="max-w-2xl mx-auto bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Recipe Not Found</h2>
        <p>The recipe you are looking for does not exist or has been deleted.</p>
        <Link to="/" className="mt-6 inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium shadow">
          Go to All Recipes
        </Link>
      </div>
    );
  }

  // Function to initiate the deletion confirmation
  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  // Function to perform the actual deletion after confirmation
  const confirmDelete = async () => {
    try {
      await deleteRecipe(recipe.id);
      setShowConfirmModal(false); // Close the modal
      navigate('/'); // Redirect to the home page (recipe list) after successful deletion
    } catch (error) {
      console.error("Error deleting recipe:", error);
      // You could add a message here to display to the user if deletion fails
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-xl p-6 sm:p-8 border border-white border-opacity-20">
      <h1 className="text-4xl font-extrabold text-white mb-4">{recipe.title}</h1>
      <p className="text-gray-200 text-lg mb-6">{recipe.description}</p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link
          to={`/recipes/${recipe.id}/edit`}
          className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300 shadow-md transform hover:scale-105"
        >
          Edit Recipe
        </Link>
        <DeleteRecipeButton onConfirm={handleDeleteClick} /> {/* Uses the confirmation modal logic */}
      </div>

      {/* Confirmation Modal for Deletion (Custom UI, not alert()) */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-sm w-full text-gray-900 border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete "{recipe.title}"? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)} // Close modal on Cancel
                className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete} // Proceed with deletion on Confirm
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * EditRecipeForm Component
 * A form to modify an existing recipe's title and description.
 */
function EditRecipeForm() {
  const { id } = useParams(); // Get the recipe ID from the URL
  const navigate = useNavigate();
  const recipes = useRecipeStore((state) => state.recipes);
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  // Find the recipe to be edited
  const recipe = recipes.find((r) => r.id === id);

  // State for form inputs
  const [title, setTitle] = useState(recipe ? recipe.title : '');
  const [description, setDescription] = useState(recipe ? recipe.description : '');
  // State for displaying feedback messages (success/error)
  const [message, setMessage] = useState('');

  // Update form fields if recipe data changes (e.g., if navigated directly)
  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
    }
  }, [recipe]);

  // Handle case where the recipe to edit is not found
  if (!recipe) {
    return (
      <div className="max-w-xl mx-auto bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Recipe Not Found</h2>
        <p>Cannot edit. The recipe you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium shadow">
          Go to All Recipes
        </Link>
      </div>
    );
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!title.trim() || !description.trim()) {
      setMessage('Please fill in both title and description.');
      return;
    }

    try {
      await updateRecipe(recipe.id, { title, description }); // Call the update action
      setMessage('Recipe updated successfully!');
      // Clear message and navigate back to recipe details after a short delay
      setTimeout(() => {
        setMessage('');
        navigate(`/recipes/${recipe.id}`);
      }, 1500);
    } catch (error) {
      console.error("Failed to update recipe:", error);
      setMessage('Failed to update recipe. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-xl p-6 sm:p-8 border border-white border-opacity-20">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Edit Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="edit-title" className="block text-white text-sm font-medium mb-2">
            Recipe Title
          </label>
          <input
            type="text"
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="edit-description" className="block text-white text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg transform hover:scale-105"
        >
          Save Changes
        </button>
        {message && (
          <p className={`text-center mt-4 ${message.includes('successfully') ? 'text-green-300' : 'text-red-300'}`}>
            {message}
          </p>
        )}
        <Link
          to={`/recipes/${recipe.id}`}
          className="block w-full text-center bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md transform hover:scale-105 mt-4"
        >
          Cancel
        </Link>
      </form>
    </div>
  );
}

/**
 * AddRecipeForm Component
 * A form to add a new recipe to the store.
 */
function AddRecipeForm() {
  const navigate = useNavigate();
  const addRecipe = useRecipeStore((state) => state.addRecipe);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setMessage('Please fill in both title and description.');
      return;
    }

    try {
      await addRecipe({ title, description });
      setMessage('Recipe added successfully!');
      // Clear form fields
      setTitle('');
      setDescription('');
      // Navigate to the home page after a short delay
      setTimeout(() => {
        setMessage('');
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error("Failed to add recipe:", error);
      setMessage('Failed to add recipe. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-xl p-6 sm:p-8 border border-white border-opacity-20">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="add-title" className="block text-white text-sm font-medium mb-2">
            Recipe Title
          </label>
          <input
            type="text"
            id="add-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="add-description" className="block text-white text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="add-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg transform hover:scale-105"
        >
          Add Recipe
        </button>
        {message && (
          <p className={`text-center mt-4 ${message.includes('successfully') ? 'text-green-300' : 'text-red-300'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

/**
 * DeleteRecipeButton Component
 * A simple button that triggers a confirmation process for deleting a recipe.
 * The actual confirmation logic is handled by its parent (`RecipeDetails`).
 */
function DeleteRecipeButton({ onConfirm }) {
  return (
    <button
      onClick={onConfirm}
      className="flex-1 text-center bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300 shadow-md transform hover:scale-105"
    >
      Delete Recipe
    </button>
  );
}

/**
 * NotFound Component
 * A basic component for handling routes that don't match any defined path.
 */
function NotFound() {
  return (
    <div className="max-w-xl mx-auto bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-xl p-8 text-center text-white">
      <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-lg mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium shadow">
        Go to Home
      </Link>
    </div>
  );
}

export default App;

