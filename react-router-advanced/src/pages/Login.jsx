
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // In a real app, you would validate credentials here.
    // For this task, we'll just simulate a successful login.
    localStorage.setItem('isAuthenticated', 'true');
    // Redirect the user to the dashboard after "logging in"
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>Login Page</h2>
      <p>Click the button to simulate a successful login.</p>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;