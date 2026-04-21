import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="footer mt-auto py-5 bg-dark text-white">
            <Container>
                <Row className="gy-4">
                    <Col md={4}>
                        <h4 className="text-success mb-3">OrganicProduct</h4>
                        <p className="text-secondary">
                            Connecting local farmers and organic product sellers directly with buyers.
                            Fresh, natural, and straight from the source.
                        </p>
                    </Col>
                    <Col md={4}>
                        <h5 className="mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-secondary text-decoration-none hover-white">Home</a></li>
                            <li><a href="/login" className="text-secondary text-decoration-none hover-white">Login</a></li>
                            <li><a href="/register" className="text-secondary text-decoration-none hover-white">Register</a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5 className="mb-3">Disclaimer</h5>
                        <p className="text-secondary small">
                            This website connects farmers and buyers for organic products. We do not guarantee the quality, truthfulness, or safety of any products listed, and buyers assume all responsibility for verifying their quality before purchasing. OrganicProduct is not liable for any issues arising from transactions on this platform."                        </p>
                    </Col>
                </Row>
                <hr className="border-secondary mt-4 mb-3" />
                <div className="text-center text-secondary small">
                    &copy; {new Date().getFullYear()} OrganicProduct. All rights reserved.
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
