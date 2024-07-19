import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Form, FormGroup, Input, Label, ListGroup, ListGroupItem } from 'reactstrap';

export default function AdminProductPage() {
    const [products, setProducts] = useState([]);
    const [productForm, setProductForm] = useState({
        title: '',
        description: '',
        price: '',
        imageUrl: ''
    });

    const API = 'http://localhost:5454';

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductForm(prev => ({ ...prev, [name]: value }));
    };

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

    const addProduct = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            console.error("Validation Failed");
            return;
        }

        const fullProductDetails = {
            ...productForm,
            brand: 'Beta',
            color: 'Leather',
            discountedPrice: '1000',
            discountPercent: '1',
            size: [
                { name: "S", quantity: 90 },
                { name: "M", quantity: 100 },
                { name: "L", quantity: 100 }
            ],
            topLavelCategory: 'women',
            secondLavelCategory: 'clothing',
            thirdLavelCategory: 'top'
        };

        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        };

        const payload = JSON.stringify(fullProductDetails);

        try {
            const url = `${API}/api/admin/products/`;
            const response = await axios.post(url, payload, { headers });
            alert('Product added successfully!');
            fetchProducts();
            clearForm();
        } catch (error) {
            console.error("Error submitting product:", error);
            alert('Failed to add product: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    const validateForm = () => {
        return Object.values(productForm).every(value => value.trim() !== '');
    };

    const clearForm = () => {
        setProductForm({
            title: '', description: '', price: '', imageUrl: ''
        });
    };

    const deleteProduct = async (productId) => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        };

        try {
            await axios.delete(`${API}/api/admin/products/${productId}/delete`, { headers });
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container>
            <h2>Add Product</h2>
            <Form onSubmit={addProduct}>
                {Object.entries(productForm).map(([key, value]) => (
                    <FormGroup key={key}>
                        <Label for={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                        <Input
                            type={['price'].includes(key) ? 'number' : 'text'}
                            name={key}
                            id={key}
                            value={value}
                            onChange={handleInputChange}
                            required
                        />
                    </FormGroup>
                ))}
                <FormGroup className="float-right">
                    <Button type="submit" color="primary">Add</Button>
                    <Button onClick={clearForm} color="secondary" style={{ marginLeft: '10px' }}>Cancel</Button>
                </FormGroup>
            </Form>
            <h3 style={{ marginTop: '30px' }}>Products List</h3>
            <ListGroup>
                {products.map(product => (
                    <ListGroupItem key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>id {product.id} : {product.title} - ${product.price}</span>
                        <Button onClick={() => deleteProduct(product.id)} color="danger">Delete</Button>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    );
}
