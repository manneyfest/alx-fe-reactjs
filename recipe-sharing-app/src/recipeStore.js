// src/recipeStore.js
import { create } from 'zustand'; // This imports the named export 'create';

const useRecipeStore = create(set => ({
  recipes: [],
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
  setRecipes: (recipes) => set({ recipes })
}));

export { useRecipeStore };