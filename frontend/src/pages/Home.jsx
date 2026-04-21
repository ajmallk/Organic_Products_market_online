import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/products/');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h2 className="mb-4">Fresh Organic Products</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
                {products.map(product => (
                    <Col key={product.id}>
                        <Card className="h-100">
                            {product.image ? (
                                <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ height: '200px', backgroundColor: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span className="text-muted">No Image</span>
                                </div>
                            )}
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    <i className="bi bi-geo-alt"></i> <strong>Location:</strong> {product.location}<br />
                                    <i className="bi bi-person"></i> <strong>Seller:</strong> {product.seller_name}
                                </Card.Text>
                                <Button as={Link} to={`/product/${product.id}`} variant="primary" className="mt-auto">View Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                {products.length === 0 && (
                    <Col className="w-100 text-center py-5">
                        <h4 className="text-muted">No products available at the moment.</h4>
                    </Col>
                )}
            </Row>
        </div>
    );
}

export default Home;
