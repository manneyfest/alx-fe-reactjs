import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link for navigation back
import mockRecipes from '../data.json'; // Make sure this path is correct based on your data.json location

const RecipeDetail = () => {
  // useParams hook extracts parameters from the URL.
  // In our route path="/recipe/:id", ':id' is the parameter we want.
  const { id } = useParams();

  // useState to hold the recipe data. Initialized to null because no recipe is loaded yet.
  const [recipe, setRecipe] = useState(null);

  // useEffect hook to perform side effects, in this case, fetching data when the component mounts
  // or when the 'id' parameter changes.
  useEffect(() => {
    // Convert the ID from the URL (which is a string) to an integer.
    // This is important because IDs in data.json are numbers.
    const recipeIdNum = parseInt(id, 10);

    // Find the recipe in the mockRecipes array that matches the ID.
    const foundRecipe = mockRecipes.find(r => r.id === recipeIdNum);

    // Update the state with the found recipe.
    setRecipe(foundRecipe);

    // The dependency array [id] ensures that this effect re-runs if the 'id' in the URL changes.
    // This is crucial if a user navigates from /recipe/1 to /recipe/2 directly.
  }, [id]);

  // Conditional rendering:
  // If no recipe is found (e.g., invalid ID in URL), display a message.
  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Recipe Not Found!</h1>
        <p className="text-lg text-gray-600 mb-8">
          The recipe you are looking for does not exist.
        </p>
        <Link 
          to="/" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg 
                     transition duration-300 ease-in-out transform hover:scale-105"
        >
          Go back to Home
        </Link>
      </div>
    );
  }

  // If a recipe is found, render its details using Tailwind CSS for styling.
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
        {recipe.title}
      </h1>

      <div className="flex flex-col md:flex-row items-start md:space-x-8">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow-xl mb-6 md:mb-0" 
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/CCCCCC/000000?text=Image+Not+Found"; }}
        />
        
        <div className="w-full md:w-1/2">
          <p className="text-gray-700 text-xl leading-relaxed mb-8">
            {recipe.summary}
          </p>

          {/* Ingredients Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
              Ingredients
            </h2>
            <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
              {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          {/* Instructions Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
              Instructions
            </h2>
            <ol className="list-decimal list-inside text-gray-700 text-lg space-y-2">
              {recipe.instructions && recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
