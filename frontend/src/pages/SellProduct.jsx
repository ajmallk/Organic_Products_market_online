import React, { useState, useContext } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
            await axios.post('http://127.0.0.1:8000/api/products/', uploadData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authTokens.access}`
                }
            });
            navigate('/');
        } catch (err) {
            setError('Error listing product. Please check your inputs.');
            console.error(err);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <Card className="p-4 shadow-sm">
                    <h3 className="mb-4">Sell Organic Product</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" name="name" onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control type="file" name="image" accept="image/*" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>WhatsApp Number</Form.Label>
                            <Form.Control type="text" name="whatsapp_number" placeholder="e.g., +1234567890" onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" name="location" onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={4} name="description" onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            List Product
                        </Button>
                    </Form>
                </Card>
            </div>
        </div>
    );
}

export default SellProduct;
