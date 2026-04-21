import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        // first_name: '',
        // last_name: ''
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
        <div className="row justify-content-center mt-4">
            <div className="col-md-6">
                <Card className="p-4 shadow-sm">
                    <h3 className="mb-4 text-center">Create an Account</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* <div className="col-md-6 mb-3">
                                <Form.Group controlId="first_name">______________________fast name
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name="first_name" onChange={handleChange} required />
                                </Form.Group>
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Group controlId="last_name">________________last name
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="last_name" onChange={handleChange} required />
                                </Form.Group>
                            </div> */}
                        </div>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mb-3">
                            Register
                        </Button>
                        <div className="text-center">
                            Already have an account? <Link to="/login">Login here</Link>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
}

export default Register;
