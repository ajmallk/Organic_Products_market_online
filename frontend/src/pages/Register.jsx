import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/register/', formData);
            navigate('/login');
        } catch (err) {
            setError('Error registering. Please try again with different credentials.');
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} lg={5}>
                    <Card className="p-4 shadow-sm border-0 rounded-4">
                        <div className="text-center mb-4">
                            <h3 className="fw-bold">Create Account</h3>
                            <p className="text-muted">Join the organic movement today</p>
                        </div>
                        {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" placeholder="Choose a unique username" onChange={handleChange} required className="rounded-3" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="name@example.com" onChange={handleChange} required className="rounded-3" />
                            </Form.Group>
                            
                            <Form.Group className="mb-4" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Create a strong password" onChange={handleChange} required className="rounded-3" />
                            </Form.Group>
                            
                            <Button variant="primary" type="submit" className="w-100 mb-3 py-2 rounded-3 fw-semibold">
                                Create Account
                            </Button>
                            
                            <div className="text-center small">
                                Already have an account? <Link to="/login" className="text-organic fw-bold text-decoration-none">Login here</Link>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
