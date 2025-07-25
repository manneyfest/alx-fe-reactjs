import { create } from 'zustand';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, deleteDoc, onSnapshot, collection } from 'firebase/firestore';

// --- Firebase Initialization ---
// These global variables are provided by the Canvas environment
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
// Get Firestore and Auth instances
const db = getFirestore(app);
const auth = getAuth(app);

// --- Zustand Store Definition ---
export const useRecipeStore = create((set, get) => ({
  recipes: [],
  // `isDataLoaded` helps us know when the initial data fetch from Firestore is complete
  isDataLoaded: false,
  userId: null, // To store the authenticated user's ID

  // This action handles Firebase authentication and sets up the real-time data listener
  initFirebaseAndLoadData: async () => {
    try {
      // Authenticate the user using the provided custom token or anonymously
      if (initialAuthToken) {
        await signInWithCustomToken(auth, initialAuthToken);
      } else {
        // Fallback to anonymous sign-in if no custom token is available
        await signInAnonymously(auth);
      }

      // Set up an authentication state listener
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const currentUserId = user.uid;
          set({ userId: currentUserId }); // Update the userId in the Zustand store

          // Define the Firestore collection path for this user's recipes
          // Recipes are stored privately per user: artifacts/{appId}/users/{userId}/recipes
          const userRecipesCollectionRef = collection(db, `artifacts/${appId}/users/${currentUserId}/recipes`);

          // Set up a real-time listener using onSnapshot
          // This ensures that `recipes` state is always up-to-date with Firestore
          onSnapshot(userRecipesCollectionRef, (snapshot) => {
            const fetchedRecipes = snapshot.docs.map(doc => ({
              id: doc.id, // The document ID is crucial for updates/deletions
              ...doc.data() // All other fields from the document
            }));
            set({ recipes: fetchedRecipes, isDataLoaded: true }); // Update recipes and mark data as loaded
          }, (error) => {
            console.error("Error fetching recipes from Firestore: ", error);
            set({ isDataLoaded: true }); // Still mark as loaded even if there's an error to prevent infinite loading
          });
        } else {
          // If no user is signed in, clear recipes and mark data as loaded
          console.log("No user signed in. Recipe data will not be loaded.");
          set({ userId: null, recipes: [], isDataLoaded: true });
        }
      });
    } catch (error) {
      console.error("Firebase authentication setup error:", error);
      set({ isDataLoaded: true }); // Ensure `isDataLoaded` is set even if auth fails
    }
  },

  // Action to add a new recipe to Firestore
  addRecipe: async (recipeData) => {
    const { userId } = get();
    if (!userId) {
      console.error("User not authenticated. Cannot add recipe.");
      return;
    }
    try {
      // Create a new document reference with an auto-generated ID
      const newDocRef = doc(collection(db, `artifacts/${appId}/users/${userId}/recipes`));
      // Set the document data. `setDoc` with a new ref adds a new document.
      await setDoc(newDocRef, { ...recipeData, createdAt: new Date().toISOString() });
      console.log("Recipe added successfully to Firestore with ID:", newDocRef.id);
    } catch (e) {
      console.error("Error adding document to Firestore: ", e);
    }
  },

  // Action to update an existing recipe in Firestore
  updateRecipe: async (recipeId, updatedData) => {
    const { userId } = get();
    if (!userId) {
      console.error("User not authenticated. Cannot update recipe.");
      return;
    }
    try {
      // Get a reference to the specific recipe document
      const recipeRef = doc(db, `artifacts/${appId}/users/${userId}/recipes`, recipeId);
      // Use `setDoc` with `{ merge: true }` to update only the specified fields, leaving others untouched
      await setDoc(recipeRef, updatedData, { merge: true });
      console.log("Recipe updated successfully in Firestore:", recipeId);
    } catch (e) {
      console.error("Error updating document in Firestore: ", e);
    }
  },

  // Action to delete a recipe from Firestore
  deleteRecipe: async (recipeId) => {
    const { userId } = get();
    if (!userId) {
      console.error("User not authenticated. Cannot delete recipe.");
      return;
    }
    try {
      // Get a reference to the specific recipe document
      const recipeRef = doc(db, `artifacts/${appId}/users/${userId}/recipes`, recipeId);
      // Delete the document from Firestore
      await deleteDoc(recipeRef);
      console.log("Recipe deleted successfully from Firestore:", recipeId);
    } catch (e) {
      console.error("Error deleting document from Firestore: ", e);
    }
  },
}));
