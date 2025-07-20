import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Ensure Link and useLocation are imported

function Navbar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname === path ? '#3498db' : '#2c3e50',
    textDecoration: 'none',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    padding: '8px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    backgroundColor: location.pathname === path ? '#ecf0f1' : 'transparent'
  });

  const linkHoverStyle = {
    backgroundColor: '#e0ffff',
    color: '#3498db'
  };

  return (
    <nav style={{
      backgroundColor: '#ffffff',
      padding: '15px 20px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      position: 'sticky',
      top: '0',
      zIndex: '1000'
    }}>
      <div style={{
        fontSize: '1.8em',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginRight: '20px'
      }}>MyCompany</div>
      <ul style={{
        listStyle: 'none',
        margin: '0',
        padding: '0',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <li>
          <Link to="/" style={linkStyle('/')} onMouseOver={(e) => Object.assign(e.target.style, linkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, linkStyle('/'))}>Home</Link>
        </li>
        <li>
          <Link to="/about" style={linkStyle('/about')} onMouseOver={(e) => Object.assign(e.target.style, linkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, linkStyle('/about'))}>About</Link>
        </li>
        <li>
          <Link to="/services" style={linkStyle('/services')} onMouseOver={(e) => Object.assign(e.target.style, linkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, linkStyle('/services'))}>Services</Link>
        </li>
        <li>
          <Link to="/contact" style={linkStyle('/contact')} onMouseOver={(e) => Object.assign(e.target.style, linkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, linkStyle('/contact'))}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;