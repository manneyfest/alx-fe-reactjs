import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null); // State to store user data
  const [isLoading, setIsLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for error messages

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!username) return; // Don't search if the input is empty

    setIsLoading(true);
    setUserData(null); // Clear previous user data
    setError(null);    // Clear previous errors

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError("Looks like we cant find the user");
      console.error(err); // Log the detailed error to the console
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Enter GitHub username"
        />
        <button type="submit">Search</button>
      </form>

      {/* Conditional rendering based on state */}
      {isLoading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {userData && (
        <div>
          <h2>{userData.name || userData.login}</h2>
          <img src={userData.avatar_url} alt="User Avatar" width="100" />
          <p>
            <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
              View Profile on GitHub
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;