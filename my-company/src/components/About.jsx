import React from 'react';

function About() {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f8ff', // GhostWhite background
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
        color: '#2c3e50',
        fontSize: '2.5em',
        marginBottom: '15px'
      }}>About Us</h1>
      <p style={{
        color: '#34495e',
        fontSize: '1.2em',
        lineHeight: '1.6',
        maxWidth: '800px'
      }}>
        Our company has been providing top-notch services since 1990. We specialize in various fields including technology, marketing, and consultancy.
        Our mission is to empower businesses and individuals through cutting-edge solutions and unparalleled support. We believe in building lasting relationships with our clients based on trust and mutual success.
      </p>
    </div>
  );
}

export default About;