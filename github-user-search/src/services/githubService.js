import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/search/users';

export const fetchUserData = async (params) => {
  try {
    const query = new URLSearchParams();
    if (params.username) {
      query.append('q', `user:${params.username}`);
    }
    if (params.location) {
      query.append('q', `${query.get('q') ? query.get('q') + '+' : ''}location:${params.location}`);
    }
    if (params.minRepos) {
      query.append('q', `${query.get('q') ? query.get('q') + '+' : ''}repos:>=${params.minRepos}`);
    }

    const response = await axios.get(`${GITHUB_API_URL}?${query.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};