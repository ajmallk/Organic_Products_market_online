import React, { useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
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
        <div className="row justify-content-center mt-5">
            <div className="col-md-5">
                <Card className="p-4 shadow-sm">
                    <h3 className="mb-4 text-center">Welcome Back</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Enter username" required />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mb-3">
                            Login
                        </Button>
                        <div className="text-center">
                            Don't have an account? <Link to="/register">Register here</Link>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
}

export default Login;
