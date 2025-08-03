import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [usersData, setUsersData] = useState([]); // Changed to an array
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };
  
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
    setUsersData([]); // Clear previous results
    setError(null);

    try {
      const params = { username, location, minRepos };
      const data = await fetchUserData(params);
      if (data.items.length === 0) {
        setError("Looks like we cant find any users with that criteria");
      }
      setUsersData(data.items);
    } catch (err) {
      setError("Looks like we cant find any users with that criteria");
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
      
      {/* Updated rendering to map through the results array */}
      {usersData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {usersData.map(user => (
            <div key={user.id} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
              <img src={user.avatar_url} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-600" />
              <h2 className="text-xl font-semibold mb-1">{user.login}</h2>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 mt-auto">
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;