
import React from 'react';

function Footer() {
  return (
    // Apply inline styles to the footer tag
    <footer style={{
      backgroundColor: '#282c34', // Dark background, similar to Header
      color: 'white',             // White text - This was missing!
      textAlign: 'center',        // Center align text
      padding: '18px',            // Good padding
      marginTop: '30px',          // Margin at the top to separate from main content
      borderRadius: '8px',        // Rounded corners
      fontSize: '1em',            // Standard font size
      boxShadow: '0 -2px 5px rgba(0,0,0,0.2)' // Shadow at the top
    }}>
      {/* Apply inline styles to the paragraph tag */}
      <p style={{
        margin: 0,                // Remove default paragraph margin
        letterSpacing: '0.5px'    // Slightly spaced letters
      }}>
        © {new Date().getFullYear()} City Lovers
      </p>
    </footer>
  );
}

export default Footer;