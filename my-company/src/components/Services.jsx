import React from 'react';

function Services() {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f5fffa', // MintCream background
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
        marginBottom: '20px'
      }}>Our Services</h1>
      <ul style={{
        listStyleType: 'none',
        padding: '0',
        fontSize: '1.2em',
        color: '#34495e'
      }}>
        <li style={{ margin: '10px 0', padding: '8px 15px', backgroundColor: '#e0ffff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>Technology Consulting</li>
        <li style={{ margin: '10px 0', padding: '8px 15px', backgroundColor: '#e0ffff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>Market Analysis</li>
        <li style={{ margin: '10px 0', padding: '8px 15px', backgroundColor: '#e0ffff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>Product Development</li>
        <li style={{ margin: '10px 0', padding: '8px 15px', backgroundColor: '#e0ffff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>Cloud Solutions</li>
        <li style={{ margin: '10px 0', padding: '8px 15px', backgroundColor: '#e0ffff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>UI/UX Design</li>
      </ul>
    </div>
  );
}

export default Services;