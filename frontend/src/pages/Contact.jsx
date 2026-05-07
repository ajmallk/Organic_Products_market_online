import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const response = await fetch('http://localhost:8000/api/contact/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormData({ name: '', email: '', subject: '', message: '' });
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={6}>
                    <Card className="p-4 shadow-sm border-0 rounded-4">
                        <div className="text-center mb-4">
                            <h3 className="fw-bold">Contact Us</h3>
                            <p className="text-muted">We'd love to hear from you!</p>
                        </div>

                        {status === 'success' && (
                            <Alert variant="success" className="rounded-3">
                                ✅ Message sent! We'll get back to you soon.
                            </Alert>
                        )}
                        {status === 'error' && (
                            <Alert variant="danger" className="rounded-3">
                                ❌ Something went wrong. Please try again.
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit} id="contact-form">
                            <Form.Group className="mb-3" controlId="contactName">
                                <Form.Label className="fw-semibold">Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your full name"
                                    required
                                    className="rounded-3"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="contactEmail">
                                <Form.Label className="fw-semibold">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="rounded-3"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="contactSubject">
                                <Form.Label className="fw-semibold">Subject</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="What is this about?"
                                    required
                                    className="rounded-3"
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="contactMessage">
                                <Form.Label className="fw-semibold">Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here..."
                                    required
                                    className="rounded-3"
                                />
                            </Form.Group>

                            <Button
                                id="contact-submit-btn"
                                variant="primary"
                                type="submit"
                                className="w-100 py-2 rounded-3 fw-bold"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Contact;
