
import React, { useState } from 'react';

const RegistrationForm = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
     
        e.preventDefault();

       
        const newErrors = {};
        if (formData.username.trim() === '') {
            newErrors.username = 'Username is required';
        }
        if (formData.email.trim() === '') {
            newErrors.email = 'Email is required';
        }
        if (formData.password.trim() === '') {
            newErrors.password = 'Password is required';
        }

        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        
        setErrors({});
        console.log('Form Submitted!', formData);


    };


    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center' }}>User Registration</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                    {/* Display error message if it exists */}
                    {errors.username && <span style={{ color: 'red', fontSize: '0.8em' }}>{errors.username}</span>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                    {errors.email && <span style={{ color: 'red', fontSize: '0.8em' }}>{errors.email}</span>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                    {errors.password && <span style={{ color: 'red', fontSize: '0.8em' }}>{errors.password}</span>}
                </div>
                <button
                    type="submit"
                    style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;