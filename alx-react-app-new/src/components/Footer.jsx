
import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#282c34', 
      color: 'white',             
      textAlign: 'center',        
      padding: '18px',            
      borderRadius: '8px',        
      boxShadow: '0 -2px 5px rgba(0,0,0,0.2)' 
    }}>
    
      <p style={{
        margin: 0,                
        letterSpacing: '0.5px'   
      }}>
        © {new Date().getFullYear()} City Lovers
      </p>
    </footer>
  );
}

export default Footer;