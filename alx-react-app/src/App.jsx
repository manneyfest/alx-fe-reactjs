
// src/App.jsx

import React from 'react'; // Import React if you are using JSX in this file
import WelcomeMessage from "./components/WelcomeMessage"; // Import the WelcomeMessage component
import UserProfile from "./components/UserProfile"; // Import the newly created UserProfile component

/**
 * App Component
 *
 * This is the main component of the application.
 * It renders the WelcomeMessage and UserProfile components.
 */
function App() {
  return (
    // Using a main div to wrap all components.
    // Applying basic Tailwind CSS for centering and overall page styling.
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Render the WelcomeMessage component */}
      <WelcomeMessage />

      {/* Render the UserProfile component with specific props */}
      <UserProfile
        name="Alice Johnson"
        age={25} // Age can be a number, React will convert it to string for display
        bio="A passionate software developer who loves coding, hiking, and exploring new technologies."
      />

      {/* You can add more UserProfile components with different data */}
      <UserProfile
        name="Bob Williams"
        age={30}
        bio="An avid photographer and a digital artist, always looking for new inspirations."
      />
    </div>
  );
}

export default App; // Export App as the default component for the application
