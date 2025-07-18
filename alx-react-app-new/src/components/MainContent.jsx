import React from 'react';

function MainContent() {
    return (
      // Apply inline styles to the main tag
      <main style={{
        backgroundColor: '#f0f8ff', // Light blue background
        padding: '25px',            // Generous padding
        margin: '20px auto',        // Center with auto margins, add vertical margin
        maxWidth: '600px',          // Max width for better readability
        borderRadius: '12px',       // More rounded corners
        boxShadow: '0 6px 12px rgba(0,0,0,0.15)', // More pronounced shadow
        textAlign: 'center',        // Center text within the main content
        color: '#333'               // Dark gray text color
      }}>
        {/* Apply inline styles to the paragraph tag */}
        <p style={{
          fontSize: '1.3em',        // Larger font size
          fontWeight: 'bold',       // Bold text
          lineHeight: '1.6',        // Improve line spacing
          color: '#0056b3'          // Darker blue for the text
        }}>
          I love to visit New York, Paris, and Tokyo.
        </p>
      </main>
    );
  }
  
  export default MainContent;
  