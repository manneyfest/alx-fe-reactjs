import React, { useState, useEffect } from 'react';
import mockRecipes from '../data.json'; // The path might vary based on your project structure.

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(mockRecipes);
  }, []);

  return (
    <div>
      {recipes.length > 0 ? (
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.map(recipe => (
              <div key={recipe.id} className="bg-white rounded-xl shadow-md p-6 transition duration-300 ease-in-out hover:shadow-lg hover:scale-105">
                <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover rounded-md mb-4" />
                <h2 className="text-xl font-bold text-gray-800">{recipe.title}</h2>
                <p className="text-gray-600 mt-2">{recipe.summary}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading recipes...</p>
      )}
    </div>
  );
};

export default HomePage;