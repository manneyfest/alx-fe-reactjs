// src/components/recipeStore.js

import { create } from 'zustand';

const useRecipeStore = create(set => ({
  // Existing State
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  // --- New: State for Favorites and Recommendations ---
  favorites: [], // Array to store IDs of favorite recipes
  recommendations: [], // Array to store recommended recipes

  // Existing Actions

  addRecipe: (newRecipe) => set(state => {
    const updatedRecipes = [...state.recipes, newRecipe];
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
      // Recalculate recommendations after adding a recipe
      recommendations: useRecipeStore.getState().generateRecommendations(updatedRecipes, state.favorites)
    };
  }),

  setRecipes: (recipesArray) => set(state => {
    const newState = { recipes: recipesArray };
    if (state.searchTerm) {
      newState.filteredRecipes = recipesArray.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    } else {
      newState.filteredRecipes = recipesArray;
    }
    // Recalculate recommendations after setting/loading recipes
    newState.recommendations = useRecipeStore.getState().generateRecommendations(recipesArray, state.favorites);
    return newState;
  }),

  deleteRecipe: (recipeId) => set(state => {
    const updatedRecipes = state.recipes.filter(recipe => recipe.id !== recipeId);
    const updatedFavorites = state.favorites.filter(id => id !== recipeId); // Also remove from favorites if deleted
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
      favorites: updatedFavorites, // Update favorites
      // Recalculate recommendations after deleting a recipe
      recommendations: useRecipeStore.getState().generateRecommendations(updatedRecipes, updatedFavorites)
    };
  }),

  updateRecipe: (updatedRecipe) => set(state => {
    const updatedRecipes = state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
      // Recalculate recommendations after updating a recipe
      recommendations: useRecipeStore.getState().generateRecommendations(updatedRecipes, state.favorites)
    };
  }),

  setSearchTerm: (term) => set(state => {
    const newSearchTerm = term.toLowerCase();
    const newFilteredRecipes = state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(newSearchTerm)
    );
    return {
      searchTerm: newSearchTerm,
      filteredRecipes: newFilteredRecipes
    };
  }),

  filterRecipes: () => set(state => ({
    filteredRecipes: state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    )
  })),

  // --- New Actions for Favorites and Recommendations ---

  /**
   * Action to add a recipe ID to the favorites array.
   * Ensures no duplicates are added.
   * @param {string} recipeId - The ID of the recipe to favorite.
   */
  addFavorite: (recipeId) => set(state => {
    const newFavorites = state.favorites.includes(recipeId)
      ? state.favorites
      : [...state.favorites, recipeId];
    return {
      favorites: newFavorites,
      // Recalculate recommendations after adding a favorite
      recommendations: useRecipeStore.getState().generateRecommendations(state.recipes, newFavorites)
    };
  }),

  /**
   * Action to remove a recipe ID from the favorites array.
   * @param {string} recipeId - The ID of the recipe to unfavorite.
   */
  removeFavorite: (recipeId) => set(state => {
    const newFavorites = state.favorites.filter(id => id !== recipeId);
    return {
      favorites: newFavorites,
      // Recalculate recommendations after removing a favorite
      recommendations: useRecipeStore.getState().generateRecommendations(state.recipes, newFavorites)
    };
  }),

  /**
   * Generates mock recommendations based on favorites.
   * This is called internally after relevant state changes.
   * (The parameters are for internal use to get the latest state during updates).
   */
  generateRecommendations: (currentRecipes = [], currentFavorites = []) => {
    // This is a simple mock recommendation logic:
    // It picks recipes that are *not* favorites, but might be similar or just random.
    // For a more robust system, you'd implement actual recommendation algorithms here.
    const allRecipes = currentRecipes.length ? currentRecipes : useRecipeStore.getState().recipes;
    const currentFavs = currentFavorites.length ? currentFavorites : useRecipeStore.getState().favorites;

    const nonFavoriteRecipes = allRecipes.filter(recipe => !currentFavs.includes(recipe.id));

    // Simple recommendation: pick a few random non-favorites
    const recommendations = [];
    const numRecommendations = Math.min(3, nonFavoriteRecipes.length); // Limit to 3 recommendations
    for (let i = 0; i < numRecommendations; i++) {
      const randomIndex = Math.floor(Math.random() * nonFavoriteRecipes.length);
      recommendations.push(nonFavoriteRecipes[randomIndex]);
      nonFavoriteRecipes.splice(randomIndex, 1); // Remove to avoid duplicates in recommendations
    }

    return recommendations;
  },

}));

export default useRecipeStore;