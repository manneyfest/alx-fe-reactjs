
// src/components/UserProfile.jsx

import React from 'react'; // Import React if you are using JSX in this file

/**
 * UserProfile Component
 *
 * This functional component displays a user's profile information.
 * It receives 'name', 'age', and 'bio' as props.
 *
 * Props:
 * - name (string): The name of the user.
 * - age (number/string): The age of the user.
 * - bio (string): A short biography of the user.
 */
const UserProfile = (props) => {
  return (
    // A div to wrap the user profile information.
    // Using Tailwind CSS classes for basic styling to make it look presentable.
    <div className="bg-white shadow-lg rounded-lg p-6 m-4 max-w-sm mx-auto">
      {/* Display the user's name in an h2 tag */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {props.name}
      </h2>
      {/* Display the user's age in a paragraph tag */}
      <p className="text-gray-600 text-lg mb-1">
        <span className="font-semibold">Age:</span> {props.age}
      </p>
      {/* Display the user's bio in another paragraph tag */}
      <p className="text-gray-700 text-base">
        <span className="font-semibold">Bio:</span> {props.bio}
      </p>
    </div>
  );
};

export default UserProfile; // Export UserProfile as the default export for this module
