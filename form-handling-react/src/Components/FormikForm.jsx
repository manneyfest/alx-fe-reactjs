
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

const FormikForm = () => {
    
    const initialValues = {
        username: '',
        email: '',
        password: ''
    };

  
    const handleSubmit = (values, { setSubmitting, resetForm }) => {
      
        console.log('Form Submitted!', values);

       

    
        setSubmitting(false);

    
        resetForm();
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center' }}>User Registration (with Formik)</h2>
            {/* Step 4: Use the Formik component to wrap the form. */}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {/* Step 5: Render the form using Formik components. */}
                <Form>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="username">Username:</label>
                        <Field
                            type="text"
                            name="username"
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                        {/* ErrorMessage component automatically shows the error message */}
                        <ErrorMessage name="username" component="div" style={{ color: 'red', fontSize: '0.8em' }} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="email">Email:</label>
                        <Field
                            type="email"
                            name="email"
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                        <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '0.8em' }} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="password">Password:</label>
                        <Field
                            type="password"
                            name="password"
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                        <ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: '0.8em' }} />
                    </div>
                    <button
                        type="submit"
                        style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Register with Formik
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default FormikForm;