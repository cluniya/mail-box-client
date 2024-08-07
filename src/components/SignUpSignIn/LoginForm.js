import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Modal, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const API_KEY = 'AIzaSyAl1NubGXzqIfmpo4ldoaV4r5PZkooQpBg';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
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
        console.log('Login successful:', data);
        setError(null);
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('email', data.email);
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
          history('/dummy');
        }, 3000);
      } catch (error) {
        console.error('Error logging in:', error.message);
        setError(`${error.message}`);
      }
    }
    setValidated(true);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="6" lg="4">
          <Card className="border-2 rounded-3 shadow-sm">
            <Card.Body>
              <h2 className="mb-4 text-center">Login</h2>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Control
                    required
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-primary"
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
                    className="border-primary"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your password.
                  </Form.Control.Feedback>
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}

                <div className="d-grid">
                <Button style={{ backgroundColor: 'purple', borderColor: 'purple' }} type="submit" className="mb-3">Log in
</Button>
                </div>
                <div className="text-center">
                  <Link to="/" className="text-muted"> Create New Account</Link><br/>
                  <Link to="#" className="text-muted">Forgot password?</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showSuccessPopup} onHide={() => setShowSuccessPopup(false)} centered>
        <Modal.Body className="text-center">
          <h4>Login Successful!</h4>
          <p>You will be redirected shortly...</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default LoginForm;
