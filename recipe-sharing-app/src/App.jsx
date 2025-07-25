// src/App.jsx
import './App.css'; // Assuming you have some basic styling or want to add it
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';

function App() {
  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Recipe Sharing Application</h1>

      {/* Render the AddRecipeForm component */}
      <AddRecipeForm />

      {/* Render the RecipeList component */}
      <RecipeList />
    </div>
  );
}

export default App;