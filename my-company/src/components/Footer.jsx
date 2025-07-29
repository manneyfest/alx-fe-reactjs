import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#2c3e50', // Dark blue-gray
      color: 'white',
      padding: '20px',
      textAlign: 'center',
      marginTop: 'auto', // Pushes footer to the bottom
      boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
    }}>
      <p>&copy; {new Date().getFullYear()} MyCompany. All rights reserved.</p>
    </footer>
  );
}

export default Footer;