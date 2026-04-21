import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

/**
 * Contact page — minimal 4-field form.
 * Only accessible to logged-in users (enforced by PrivateRoute in App.jsx).
 * On submit, POSTs to the Django /api/contact/ endpoint and saves to SQLite.
 */
function Contact() {
    // Form fields
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    // UI state
    const [status, setStatus] = useState(null);   // 'success' | 'error' | null
    const [loading, setLoading] = useState(false);

    /** Sync field changes into state */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /** POST form data to Django API */
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
        <div className="row justify-content-center mt-4">
            <div className="col-md-6">
                <Card className="p-4 shadow-sm">
                    <h3 className="mb-4 text-center">Contact Us</h3>

                    {/* Feedback alerts */}
                    {status === 'success' && (
                        <Alert variant="success">
                            ✅ Message sent! We'll get back to you soon.
                        </Alert>
                    )}
                    {status === 'error' && (
                        <Alert variant="danger">
                            ❌ Something went wrong. Please try again.
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit} id="contact-form">
                        {/* Name */}
                        <Form.Group className="mb-3" controlId="contactName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your full name"
                                required
                            />
                        </Form.Group>

                        {/* Email */}
                        <Form.Group className="mb-3" controlId="contactEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                            />
                        </Form.Group>

                        {/* Subject */}
                        <Form.Group className="mb-3" controlId="contactSubject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="What is this about?"
                                required
                            />
                        </Form.Group>

                        {/* Message */}
                        <Form.Group className="mb-4" controlId="contactMessage">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Write your message here..."
                                required
                            />
                        </Form.Group>

                        <Button
                            id="contact-submit-btn"
                            variant="primary"
                            type="submit"
                            className="w-100"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </Button>
                    </Form>
                </Card>
            </div>
        </div>
    );
}

export default Contact;
