import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/users';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/${username}`);
    return response.data;
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching user data:", error);
    // Throw the error so the calling component can handle it
    throw error;
  }
};