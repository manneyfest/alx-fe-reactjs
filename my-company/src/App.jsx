import React from 'react';
// Import the necessary routing components from react-router-dom
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// Import your page components.
import HomePage from './components/Home.jsx';
import AboutPage from './components/About.jsx';
import ServicesPage from './components/Services.jsx';
import ContactPage from './components/Contact.jsx';

// The main App component that will contain our navigation and routes.
const App = () => {
  const location = useLocation();

  return (
    <div>
      {/* Navigation Bar (using Link components for navigation) */}
      <nav>
        <div>
          <div>MyCompany</div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main content area where pages will be rendered based on the route */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer>
        <div>
          <p>&copy; {new Date().getFullYear()} MyCompany. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// The <BrowserRouter> component is the highest-level router component.
const RootApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default RootApp;
