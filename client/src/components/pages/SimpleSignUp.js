import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import './Auth.css';

const SimpleSignUp = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      // Minimal data for signup
      const minimalData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };
      
      const response = await axiosInstance.post('/ekmate/api/v1/auth/sign-up', minimalData);
      
      if (response.data.success) {
        setSuccess('Registration successful! Please check your email for verification instructions.');
        setTimeout(() => {
          navigate('/signin');
        }, 3000);
      } else {
        setError(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="auth-card">
              <Card.Body>
                <div className="text-center mb-4">
                  <h2 className="auth-title">Simple Sign Up</h2>
                  <p className="auth-subtitle">
                    Create your account with minimal information
                  </p>
                </div>
                
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                
                <Form onSubmit={handleSignUp}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name" 
                      required 
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email" 
                      required 
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      name="password" 
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password" 
                      required 
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      name="confirmPassword" 
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password" 
                      required 
                    />
                  </Form.Group>
                  
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                  </Button>
                  
                  <div className="text-center">
                    <p className="mb-0">
                      Already have an account? <Link to="/signin" className="auth-link">Sign In</Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SimpleSignUp;
