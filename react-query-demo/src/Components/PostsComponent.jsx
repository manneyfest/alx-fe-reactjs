// src/components/PostsComponent.jsx

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const PostsComponent = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });

  const handleRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Posts from JSONPlaceholder</h2>
      <button 
        onClick={handleRefetch} 
        disabled={isFetching}
        style={{ padding: '8px 12px', margin: '10px 0', cursor: 'pointer' }}
      >
        {isFetching ? 'Refreshing...' : 'Refetch Data'}
      </button>

      <ul>
        {data.slice(0, 10).map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;
