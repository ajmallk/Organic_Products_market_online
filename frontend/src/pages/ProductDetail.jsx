import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
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
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
                        {product.image && <Card.Img variant="top" src={product.image} style={{ maxHeight: '500px', objectFit: 'cover' }} />}
                        <Card.Body className="p-4">
                            <Card.Title className="display-6 fw-bold mb-3">{product.name}</Card.Title>
                            <Card.Text className="mb-4">
                                <div className="mb-2"><i className="bi bi-person-circle text-success me-2"></i><strong>Seller:</strong> {product.seller_name}</div>
                                <div className="mb-2"><i className="bi bi-geo-alt-fill text-danger me-2"></i><strong>Location:</strong> {product.location}</div>
                                <div className="mb-2"><i className="bi bi-calendar-event text-primary me-2"></i><strong>Listed on:</strong> {new Date(product.created_at).toLocaleDateString()}</div>
                            </Card.Text>
                            <hr className="my-4" />
                            <h5 className="fw-bold mb-3">Description</h5>
                            <Card.Text style={{ whiteSpace: 'pre-line' }} className="text-muted leading-relaxed">{product.description}</Card.Text>
                            <hr className="my-4" />
                            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-stretch align-items-sm-center gap-3 mt-4">
                                <Button as={Link} to="/" variant="outline-secondary" className="px-4 py-2 rounded-3">Back to Browse</Button>
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-success px-4 py-2 rounded-3 fw-bold shadow-sm">
                                    <i className="bi bi-whatsapp me-2"></i> Contact via WhatsApp
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductDetail;
