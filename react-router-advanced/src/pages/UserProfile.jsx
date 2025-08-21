
import React from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  // useParams hook grabs the dynamic part of the URL
  const { username } = useParams();

  return (
    <div>
      <h2>User Profile Page</h2>
      <p>Welcome, **{username}**!</p>
      <p>This content is dynamically loaded based on the URL.</p>
    </div>
  );
};

export default UserProfile;