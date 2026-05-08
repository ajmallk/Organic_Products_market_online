import React, { useState, useContext } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';

function SellProduct() {
    const { authTokens } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        whatsapp_number: '',
        location: '',
        description: '',
        image: null
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const uploadData = new FormData();
        uploadData.append('name', formData.name);
        uploadData.append('whatsapp_number', formData.whatsapp_number);
        uploadData.append('location', formData.location);
        uploadData.append('description', formData.description);
        if (formData.image) {
            uploadData.append('image', formData.image, formData.image.name);
        }

        try {
            await api.post('/products/', uploadData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            navigate('/');
        } catch (err) {
            setError('Error listing product. Please check your inputs.');
            console.error(err);
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <Card className="p-4 shadow-sm border-0 rounded-4">
                        <div className="mb-4">
                            <h3 className="fw-bold">Sell Organic Product</h3>
                            <p className="text-muted">List your fresh product for the community</p>
                        </div>
                        {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Product Name</Form.Label>
                                        <Form.Control type="text" name="name" placeholder="e.g. Fresh Tomatoes" onChange={handleChange} required className="rounded-3" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">WhatsApp Number</Form.Label>
                                        <Form.Control type="text" name="whatsapp_number" placeholder="e.g. +1234567890" onChange={handleChange} required className="rounded-3" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Location</Form.Label>
                                <Form.Control type="text" name="location" placeholder="Where is it available?" onChange={handleChange} required className="rounded-3" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Product Image</Form.Label>
                                <Form.Control type="file" name="image" accept="image/*" onChange={handleChange} className="rounded-3" />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="fw-semibold">Description</Form.Label>
                                <Form.Control as="textarea" rows={4} name="description" placeholder="Describe the quality, quantity, and price..." onChange={handleChange} required className="rounded-3" />
                            </Form.Group>
                            
                            <Button variant="primary" type="submit" className="w-100 py-2 rounded-3 fw-semibold">
                                List Product
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default SellProduct;
