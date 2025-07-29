// src/stores/useRecipeStore.js

// Import `create` as a named export from zustand
import { create } from 'zustand';

// Define your Zustand store
const useRecipeStore = create(set => ({
  // 1. State: The data your store will hold
  // `recipes` will be an array of recipe objects
  recipes: [],

  // 2. Actions: Functions that allow you to modify the state

  /**
   * Action to add a new recipe to the `recipes` array.
   * @param {object} newRecipe - The new recipe object to add.
   * Expected format: { id: string, title: string, description: string }
   */
  addRecipe: (newRecipe) => set(state => ({
    recipes: [...state.recipes, newRecipe] // Append the new recipe to the existing array
  })),

  /**
   * Action to set (replace) the entire list of recipes.
   * This is useful for initializing recipes from an external source (like mock data or an API later).
   * @param {Array<object>} recipesArray - An array of recipe objects to replace the current `recipes` state.
   */
  setRecipes: (recipesArray) => set({ recipes: recipesArray })
}));

export default useRecipeStore;