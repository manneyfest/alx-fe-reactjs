 
import React from 'react';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import MainContent from './components/MainContent';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f0f2f5', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        <Header /> 

      <UserProfile
        name="Alice Johnson"
        age={25} 
        bio="Loves hiking and photography."
      />
      <UserProfile
        name="Bob Williams"
        age={30}
        bio="An avid photographer and a digital artist, always looking for new inspirations."
      />

      <MainContent />

      <Footer />
    </div>
  );
}

export default App;
