import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Container, Row, Col, Input } from "reactstrap";
import { ItemCard } from "../Item";
import APIModeAlert from "../APIModeAlert";
import { useAPI } from '../../context/APIContext';

const Store = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const {API} = useAPI();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API}/api/admin/products/all`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <APIModeAlert />
            <Row className="text-center py-3">
                <h2>Welcome to Beta Leather</h2>
            </Row>
            <Input
                type="text"
                placeholder="Search Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: '20px', width: '100%', padding: '10px' }}
            />
            <Container>
                <Row>
                    {products.filter(product =>
                        product.title.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((product, index) => (
                        <Col sm="6" lg="4" xl="3" key={index}>
                            <ItemCard
                                id={product.id}
                                image={product.imageUrl}
                                title={product.title}
                                subtitle={`$${(product.price / 100).toFixed(2)}`}

                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Store;