// src/App.jsx

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProfileDetails from './pages/ProfileDetails';
import ProfileSettings from './pages/ProfileSettings';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login'; // Import the new Login component
import PrivateRoute from './components/PrivateRoute'; // Import the new PrivateRoute component
import './App.css';

function App() {
  // Optional: Add a logout function
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/dashboard">Dashboard (Protected)</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/users/annem">Annem's Profile</Link></li>
            <li><Link to="/users/otaku-master">Otaku Master's Profile</Link></li>
            <li><button onClick={handleLogout}>Log Out</button></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Dashboard Route */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="/profile" element={<Profile />}>
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
          <Route path="/users/:username" element={<UserProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;