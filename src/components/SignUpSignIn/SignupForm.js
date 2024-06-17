// src/SignupForm.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import './SignupForm.css'; // Import the custom CSS file

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const API_KEY = 'AIzaSyAl1NubGXzqIfmpo4ldoaV4r5PZkooQpBg';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false || formData.password !== formData.confirmPassword) {
      e.stopPropagation();
      setError('Passwords do not match or form is invalid.');
    } else {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
              returnSecureToken: true,
            }),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error.message);
        }
        console.log('Form submitted:', data);
        setSuccess('Signup successful! Please check your email to verify your account.');
        setError(null);
      } catch (error) {
        console.error('Error signing up:', error.message);
        setError(`Error: ${error.message}`);
        setSuccess(null);
      }
    }
    setValidated(true);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="4">
          <Card>
            <Card.Body>
              <h2 className="mb-4 text-center">SignUp</h2>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Control
                    required
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a password.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formConfirmPassword" className="mb-3">
                  <Form.Control
                    required
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Passwords do not match.
                  </Form.Control.Feedback>
                </Form.Group>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="d-grid">
                  <Button variant="primary" type="submit" className="custom-button mb-3">
                    Sign up
                  </Button>
                </div>
                <div className="text-center">
                  <a href="#" className="text-muted">Have an account? Login</a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
