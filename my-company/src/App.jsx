import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import all page components
import HomePage from './components/Home.jsx';
import AboutPage from './components/About.jsx';
import ServicesPage from './components/Services.jsx';
import ContactPage from './components/Contact.jsx';

// Import Navbar and Footer components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

// Main App component
const App = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', // Ensures the app takes at least the full viewport height
      fontFamily: 'Arial, sans-serif', // Basic font
      backgroundColor: '#f4f7f6' // Light background for the overall page
    }}>
      {/* Navbar will appear on all pages */}
      <Navbar />

      {/* Main content area where pages are rendered based on the route */}
      <main style={{ flexGrow: 1 }}> {/* flexGrow: 1 makes main take up available space */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Footer will appear on all pages */}
      <Footer />
    </div>
  );
};

// RootApp wraps App with BrowserRouter to enable routing for the entire application
const RootApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default RootApp;