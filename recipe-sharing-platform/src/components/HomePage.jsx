
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import mockRecipes from '../data.json'; // Ensure this path is correct

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(mockRecipes);
  }, []);

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10 mt-6">
        Our Delicious Recipes
      </h1>
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map(recipe => (
            // Wrap the card with Link
            <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
              <div 
                className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col justify-between 
                           transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
              >
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-40 object-cover rounded-md mb-4" 
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/CCCCCC/000000?text=Image+Not+Found"; }}
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{recipe.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-3">{recipe.summary}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-600 mt-10">Loading recipes...</p>
      )}
    </div>
  );
};

export default HomePage;