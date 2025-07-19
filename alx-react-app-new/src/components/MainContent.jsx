import React from 'react';

function MainContent() {
    return (
      <main style={{
        backgroundColor: '#f0f8ff', 
        padding: '25px',           
        margin: '20px auto',        
        maxWidth: '600px',          
        borderRadius: '12px',       
        boxShadow: '0 6px 12px rgba(0,0,0,0.15)', 
        textAlign: 'center',        
        color: '#333'             
      }}>
       
        <p style={{
          fontSize: '1.3em',       
          fontWeight: 'bold',       
          lineHeight: '1.6',        
          color: '#0056b3'          
        }}>
          I love to visit New York, Paris, and Tokyo.
        </p>
      </main>
    );
  }
  
  export default MainContent;
  