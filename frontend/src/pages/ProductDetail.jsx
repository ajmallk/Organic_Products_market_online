import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details", error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div className="text-center py-5">Loading...</div>;

    const whatsappLink = `https://wa.me/${product.whatsapp_number.replace(/\D/g, '')}?text=Hi, I am interested in your organic product: ${product.name}`;

    return (
        <Row className="justify-content-center">
            <Col md={8}>
                <Card className="shadow-sm">
                    {product.image && <Card.Img variant="top" src={product.image} style={{ maxHeight: '400px', objectFit: 'cover' }} />}
                    <Card.Body>
                        <Card.Title className="display-6 mb-3">{product.name}</Card.Title>
                        <Card.Text>
                            <strong>Seller:</strong> {product.seller_name} <br/>
                            <strong>Location:</strong> {product.location} <br/>
                            <strong>Listed on:</strong> {new Date(product.created_at).toLocaleDateString()}
                        </Card.Text>
                        <hr />
                        <h5>Description</h5>
                        <Card.Text style={{ whiteSpace: 'pre-line' }}>{product.description}</Card.Text>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <Button as={Link} to="/" variant="outline-secondary">Back to Browse</Button>
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-success">
                                Contact via WhatsApp
                            </a>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default ProductDetail;
