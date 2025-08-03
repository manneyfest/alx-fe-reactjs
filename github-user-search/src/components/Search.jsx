import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState(''); // New state for location
  const [minRepos, setMinRepos] = useState(''); // New state for min repos
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };
  
  // Handlers for new inputs
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  
  const handleMinReposChange = (event) => {
    setMinRepos(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!username && !location && !minRepos) return;

    setIsLoading(true);
    setUserData(null);
    setError(null);

    try {
      // The API call logic will be updated in a later step
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError("Looks like we cant find the user");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-8">GitHub User Search</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Enter GitHub username"
          className="p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* New input fields */}
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Location (e.g., Kenya)"
          className="p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          value={minRepos}
          onChange={handleMinReposChange}
          placeholder="Min Repositories"
          className="p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200">
          Search
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Existing user display logic */}
      {userData && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
          <img src={userData.avatar_url} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-600" />
          <h2 className="text-2xl font-semibold">{userData.name || userData.login}</h2>
          <p className="text-gray-400 mb-2">{userData.location}</p>
          <p className="text-gray-400 mb-4">Public Repos: {userData.public_repos}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;