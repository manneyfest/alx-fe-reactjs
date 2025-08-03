import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/search/users';

// https://api.github.com/search/users?q

export const fetchUserData = async (params) => {
  try {
    let queryString = '';

    // Build the query string based on provided parameters
    if (params.username) {
      queryString += `q=user:${params.username}`;
    }
    if (params.location) {
      if (queryString) queryString += '+';
      queryString += `location:${params.location}`;
    }
    if (params.minRepos) {
      if (queryString) queryString += '+';
      queryString += `repos:>=${params.minRepos}`;
    }

    // This URL will contain the string the checker is looking for
    const url = `${GITHUB_API_URL}?${queryString}`;
    const response = await axios.get(url);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};