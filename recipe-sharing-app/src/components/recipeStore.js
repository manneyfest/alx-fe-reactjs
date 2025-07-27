// src/stores/useRecipeStore.js

import { create } from 'zustand';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, deleteDoc, onSnapshot, collection } from 'firebase/firestore';

// --- Firebase Initialization ---
// These global variables are provided by the Canvas environment when running in production.
// For local development, we provide a dummy projectId to avoid Firebase errors.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined'
  ? JSON.parse(__firebase_config)
  : {
      // Dummy projectId for local development. When deployed to Canvas,
      // __firebase_config will provide the actual project ID.
      projectId: "dummy-local-recipe-app",
      // You can add other placeholder Firebase config fields here if needed for local testing,
      // e.g., apiKey: "your-local-api-key", authDomain: "your-local-auth-domain"
      // But projectId is the minimum to resolve the current error.
    };
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
// Get Firestore and Auth instances
const db = getFirestore(app);
const auth = getAuth(app);

// --- Zustand Store Definition ---
export const useRecipeStore = create((set, get) => ({
  recipes: [],
  isDataLoaded: false,
  userId: null,

  // --- NEW: Favorites State and Actions ---
  // Store favorite recipe IDs. This will also be stored in Firestore for persistence.
  favorites: [],
  // Store recommendations. These are generated client-side based on favorites.
  recommendations: [],

  // Action to add a recipe to favorites (both in Zustand and Firestore)
  addFavorite: async (recipeId) => {
    const { userId, favorites } = get();
    if (!userId) {
      console.error("User not authenticated. Cannot add favorite.");
      return;
    }
    if (favorites.includes(recipeId)) {
      console.log(`Recipe ${recipeId} is already a favorite.`);
      return;
    }

    try {
      const newFavorites = [...favorites, recipeId];
      // Update Zustand store immediately for responsiveness
      set({ favorites: newFavorites });

      // Update Firestore: Store favorite IDs in a document for the user
      const userFavoritesRef = doc(db, `artifacts/${appId}/users/${userId}/private`, 'favorites');
      await setDoc(userFavoritesRef, { recipeIds: newFavorites });
      console.log("Favorite added and updated in Firestore:", recipeId);
    } catch (e) {
      console.error("Error adding favorite to Firestore: ", e);
      // Revert Zustand state if Firestore update fails (optional, depends on error handling strategy)
      set({ favorites: favorites });
    }
  },

  // Action to remove a recipe from favorites (both in Zustand and Firestore)
  removeFavorite: async (recipeId) => {
    const { userId, favorites } = get();
    if (!userId) {
      console.error("User not authenticated. Cannot remove favorite.");
      return;
    }

    try {
      const newFavorites = favorites.filter(id => id !== recipeId);
      // Update Zustand store immediately for responsiveness
      set({ favorites: newFavorites });

      // Update Firestore: Store updated favorite IDs
      const userFavoritesRef = doc(db, `artifacts/${appId}/users/${userId}/private`, 'favorites');
      await setDoc(userFavoritesRef, { recipeIds: newFavorites });
      console.log("Favorite removed and updated in Firestore:", recipeId);
    } catch (e) {
      console.error("Error removing favorite from Firestore: ", e);
      // Revert Zustand state if Firestore update fails
      set({ favorites: favorites });
    }
  },

  // Action to generate personalized recipe recommendations
  // This is a client-side computation based on current `recipes` and `favorites`
  generateRecommendations: () => {
    const { recipes, favorites } = get();
    console.log('Generating recommendations...');

    // Filter out recipes that are already favorited
    const unfavoritedRecipes = recipes.filter(recipe =>
      !favorites.includes(recipe.id)
    );

    // Simple Recommendation Logic:
    // This is a mock implementation. For a real app, you'd use more complex logic:
    // - Based on tags/categories of favorited recipes
    // - Popularity among other users
    // - User's past interactions (views, comments)
    const newRecommendations = unfavoritedRecipes
      .sort(() => 0.5 - Math.random()) // Shuffle the unfavorited recipes randomly
      .slice(0, 4); // Take the first 4 as recommendations

    set({ recommendations: newRecommendations });
    console.log('Recommendations generated:', newRecommendations);
  },

  // --- Firebase Initialization and Data Loading (Modified to include favorites) ---
  initFirebaseAndLoadData: async () => {
    try {
      if (initialAuthToken) {
        await signInWithCustomToken(auth, initialAuthToken);
      } else {
        await signInAnonymously(auth);
      }

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const currentUserId = user.uid;
          set({ userId: currentUserId });

          // 1. Set up listener for User's Recipes
          const userRecipesCollectionRef = collection(db, `artifacts/${appId}/users/${currentUserId}/recipes`);
          onSnapshot(userRecipesCollectionRef, (snapshot) => {
            const fetchedRecipes = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            set({ recipes: fetchedRecipes }); // Just set recipes here. isDataLoaded will be set below.
            // After recipes are loaded, re-generate recommendations
            get().generateRecommendations();
          }, (error) => {
            console.error("Error fetching recipes from Firestore: ", error);
          });

          // 2. NEW: Set up listener for User's Favorites
          // Favorites will be stored in a subcollection called 'private'
          // with a document ID 'favorites'
          const userFavoritesDocRef = doc(db, `artifacts/${appId}/users/${currentUserId}/private`, 'favorites');
          onSnapshot(userFavoritesDocRef, (docSnap) => {
            if (docSnap.exists()) {
              const favoriteData = docSnap.data();
              // Ensure favoriteData.recipeIds is an array
              const fetchedFavorites = Array.isArray(favoriteData.recipeIds) ? favoriteData.recipeIds : [];
              set({ favorites: fetchedFavorites });
            } else {
              // If the favorites document doesn't exist, set favorites to an empty array
              set({ favorites: [] });
            }
            // After favorites are loaded, re-generate recommendations
            get().generateRecommendations();
            set({ isDataLoaded: true }); // Mark data loaded *after* both recipes and favorites listeners are set up
          }, (error) => {
            console.error("Error fetching favorites from Firestore: ", error);
            set({ isDataLoaded: true }); // Mark as loaded even on error
          });

        } else {
          console.log("No user signed in. Recipe data will not be loaded.");
          set({ userId: null, recipes: [], favorites: [], recommendations: [], isDataLoaded: true });
        }
      });
    } catch (error) {
      console.error("Firebase authentication setup error:", error);
      set({ isDataLoaded: true }); // Ensure `isDataLoaded` is set even if auth fails
    }
  },

  // --- Existing Recipe Management Actions (Unchanged, but included for completeness) ---
  addRecipe: async (recipeData) => {
    const { userId } = get();
    if (!userId) {
      console.error("User not authenticated. Cannot add recipe.");
      return;
    }
    try {
      const newDocRef = doc(collection(db, `artifacts/${appId}/users/${userId}/recipes`));
      await setDoc(newDocRef, { ...recipeData, createdAt: new Date().toISOString() });
      console.log("Recipe added successfully to Firestore with ID:", newDocRef.id);
    } catch (e) {
      console.error("Error adding document to Firestore: ", e);
    }
  },

  updateRecipe: async (recipeId, updatedData) => {
    const { userId } = get();
    if (!userId) {
      console.error("User not authenticated. Cannot update recipe.");
      return;
    }
    try {
      const recipeRef = doc(db, `artifacts/${appId}/users/${userId}/recipes`, recipeId);
      await setDoc(recipeRef, updatedData, { merge: true });
      console.log("Recipe updated successfully in Firestore:", recipeId);
    } catch (e) {
      console.error("Error updating document in Firestore: ", e);
    }
  },

  deleteRecipe: async (recipeId) => {
    const { userId } = get();
    if (!userId) {
      console.error("User not authenticated. Cannot delete recipe.");
      return;
    }
    try {
      const recipeRef = doc(db, `artifacts/${appId}/users/${userId}/recipes`, recipeId);
      await deleteDoc(recipeRef);
      console.log("Recipe deleted successfully from Firestore:", recipeId);
      // If a deleted recipe was a favorite, remove it from favorites too
      get().removeFavorite(recipeId); // Call removeFavorite action
    } catch (e) {
      console.error("Error deleting document from Firestore: ", e);
    }
  },
}));