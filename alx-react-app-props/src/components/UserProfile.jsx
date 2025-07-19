
import React from 'react'; // Import React if you are using JSX in this file


const UserProfile = (props) => {
  return (
    
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
