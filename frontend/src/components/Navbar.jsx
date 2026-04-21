import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';

/**
 * NavigationBar — top navigation bar.
 * Logged-in users see: Browse Products | Sell Product | Contact Us | [username] | Logout
 * Guest users see only: Login | Register
 */
function NavigationBar() {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <Navbar bg="white" expand="lg" className="shadow-sm mb-4 py-3">
            <Container>
                {/* Brand — always visible */}
                <Navbar.Brand as={Link} to={user ? '/' : '/login'} className="fw-bold fs-4 text-organic">
                    OrganicProduct
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    {/* Left nav links — only shown to logged-in users */}
                    <Nav className="me-auto">
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">Browse Products</Nav.Link>
                                <Nav.Link as={Link} to="/sell">Sell Product</Nav.Link>
                                <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
                            </>
                        )}
                    </Nav>

                    {/* Right nav — auth actions */}
                    <Nav>
                        {user ? (
                            /* Logged-in: show username + logout button */
                            <div className="d-flex align-items-center">
                                <Navbar.Text className="me-3">
                                    Signed in as: <strong>{user.username}</strong>
                                </Navbar.Text>
                                <Button variant="outline-danger" onClick={handleLogout} size="sm">
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            /* Guest: show Login + Register only */
                            <div className="d-flex">
                                <Nav.Link as={Link} to="/login" className="me-2">Login</Nav.Link>
                                <Button as={Link} to="/register" variant="primary">Register</Button>
                            </div>
                        )}
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
