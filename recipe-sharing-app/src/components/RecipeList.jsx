// src/components/RecipeList.jsx
import { useRecipeStore } from './recipeStore'; // Adjust path if your store is elsewhere

const RecipeList = () => {
  // Access the 'recipes' state from the Zustand store
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes added yet. Start by adding one!</p>
      ) : (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id} style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;