import React, { useContext } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

/**
 * Login page.
 * On successful login, redirects to the home page (/).
 * If the user is already logged in, PrivateRoute on "/" will just let them through.
 */
function Login() {
    let { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    /** Handle form submission — call context loginUser then redirect on success */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await loginUser(e);
        if (success) {
            navigate('/');   // redirect to home after successful login
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={6} lg={4}>
                    <Card className="p-4 shadow-sm border-0 rounded-4">
                        <div className="text-center mb-4">
                            <h3 className="fw-bold">Welcome Back</h3>
                            <p className="text-muted">Login to your organic account</p>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" placeholder="Enter username" required className="rounded-3" />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Password" required className="rounded-3" />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 mb-3 py-2 rounded-3 fw-semibold">
                                Login
                            </Button>
                            <div className="text-center small">
                                Don't have an account? <Link to="/register" className="text-organic fw-bold text-decoration-none">Register here</Link>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
