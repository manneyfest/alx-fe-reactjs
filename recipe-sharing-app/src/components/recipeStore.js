// src/components/recipeStore.js

import { create } from 'zustand';

const useRecipeStore = create(set => ({
  // 1. State: The data your store will hold
  recipes: [],

  // 2. Actions: Functions that allow you to modify the state

  /**
   * Action to add a new recipe to the `recipes` array.
   * @param {object} newRecipe - The new recipe object to add.
   * Expected format: { id: string, title: string, description: string }
   */
  addRecipe: (newRecipe) => set(state => ({
    recipes: [...state.recipes, newRecipe]
  })),

  /**
   * Action to set (replace) the entire list of recipes.
   * This is useful for initializing recipes from an external source (like mock data or an API later).
   * @param {Array<object>} recipesArray - An array of recipe objects to replace the current `recipes` state.
   */
  setRecipes: (recipesArray) => set({ recipes: recipesArray }),

  /**
   * Action to delete a recipe by its ID.
   * @param {string} recipeId - The ID of the recipe to delete.
   */
  deleteRecipe: (recipeId) => set(state => ({
    // Filter out the recipe with the matching ID
    recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
  })),

  /**
   * Action to update an existing recipe.
   * @param {object} updatedRecipe - The updated recipe object. It must contain the `id` of the recipe to update.
   * Expected format: { id: string, title: string, description: string }
   */
  updateRecipe: (updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe =>
      // If the current recipe's ID matches the updatedRecipe's ID, replace it.
      // Otherwise, keep the original recipe.
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  }))
}));

export default useRecipeStore;