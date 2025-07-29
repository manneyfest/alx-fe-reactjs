import React from 'react';

function Home() {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f0f8ff', // AliceBlue background
      minHeight: 'calc(100vh - 120px)', // Adjust for header/footer height
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      borderRadius: '8px',
      margin: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{
        color: '#2c3e50', // Dark blue-gray
        fontSize: '2.5em',
        marginBottom: '15px'
      }}>Welcome to Our Company!</h1>
      <p style={{
        color: '#34495e', // Slightly lighter dark blue-gray
        fontSize: '1.2em',
        lineHeight: '1.6'
      }}>We are dedicated to delivering excellence in all our services.</p>
    </div>
  );
}

export default Home;