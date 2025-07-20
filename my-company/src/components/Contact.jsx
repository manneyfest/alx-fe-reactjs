import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // State to hold Firebase instances, initialized to null
  const [firestoreDb, setFirestoreDb] = useState(null);
  const [firebaseAuth, setFirebaseAuth] = useState(null);

  useEffect(() => {
    let unsubscribeAuth = () => {}; // Initialize unsubscribe function

    // Initialize Firebase services inside useEffect
    // This ensures it runs only on the client side after the component mounts
    try {
      // Safely parse firebaseConfig and get appId
      const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
      const currentAppId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;


      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const auth = getAuth(app);

      setFirestoreDb(db);
      setFirebaseAuth(auth);

      // Authenticate user
      const authenticateUser = async () => {
        try {
          if (initialAuthToken) {
            await signInWithCustomToken(auth, initialAuthToken);
          } else {
            await signInAnonymously(auth);
          }
        } catch (error) {
          console.error("Firebase authentication error:", error);
        }
      };

      // Listen for auth state changes
      unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          setUserId(crypto.randomUUID()); // Fallback for unauthenticated users
        }
        setIsAuthReady(true);
      });

      authenticateUser();

    } catch (error) {
      console.error("Error initializing Firebase:", error);
      setIsAuthReady(false); // Mark auth as not ready if init fails
    }

    // Clean up subscription when component unmounts
    return () => {
      unsubscribeAuth();
    };
  }, []); // Empty dependency array means this runs once on mount

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('Submitting...');

    // Ensure Firebase is initialized and user is authenticated
    if (!isAuthReady || !userId || !firestoreDb) {
      setSubmissionStatus('Application not ready. Please try again.');
      console.error("Firebase not ready, userId not set, or DB not initialized.");
      return;
    }

    try {
      // Access appId safely within the function scope
      const currentAppId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      // Store contact form data in Firestore
      const contactRef = collection(firestoreDb, `artifacts/${currentAppId}/users/${userId}/contact_messages`);
      await addDoc(contactRef, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date(),
        userId: userId
      });
      setSubmissionStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmissionStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#fffafa',
      minHeight: 'calc(100vh - 120px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '8px',
      margin: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{
        color: '#2c3e50',
        fontSize: '2.5em',
        marginBottom: '20px'
      }}>Contact Us</h1>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '500px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            display: 'block',
            margin: '10px 0',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '1em'
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            display: 'block',
            margin: '10px 0',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '1em'
          }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          style={{
            display: 'block',
            margin: '10px 0',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '1em',
            resize: 'vertical'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '12px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.1em',
            cursor: 'pointer',
            marginTop: '10px',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          Send Message
        </button>
      </form>
      {submissionStatus && (
        <p style={{
          marginTop: '20px',
          fontSize: '1.1em',
          color: submissionStatus.includes('successfully') ? '#27ae60' : '#c0392b'
        }}>
          {submissionStatus}
        </p>
      )}
      {userId && (
          <p style={{ marginTop: '10px', fontSize: '0.8em', color: '#7f8c8d' }}>
            Your User ID: <span style={{ fontFamily: 'monospace', fontSize: '0.9em', wordBreak: 'break-all' }}>{userId}</span>
          </p>
        )}
    </div>
  );
}

export default Contact;
