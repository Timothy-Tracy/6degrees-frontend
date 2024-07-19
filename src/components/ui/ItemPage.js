import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Row, Col, Container } from "reactstrap";
import { useAPI } from '../../context/APIContext';
import { useUser } from '../../context/UserContext';
import { LoginAlert } from '../EnsureLogin';
import APIModeAlert from '../APIModeAlert';

export const ItemPage = () => {
  const { status } = useUser();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [adding, setAdding] = useState(false);
  const [buttonText, setButtonText] = useState('Add to Cart');
  const { API } = useAPI();
  const navigate = useNavigate(); // useHistory hook replaced by useNavigate

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${API}/api/products/id/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        setItem(response.data);
      } catch (error) {
        console.error('Failed to fetch item details:', error);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id, API]);

  const addToCart = async () => {
    if (!item) return;
    setAdding(true);
    setButtonText('Adding...');

    try {
      const response = await axios.put(`${API}/api/cart/add`, {
        productId: item.id,
        quantity: 1,
        size: "M"
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status !== 202) {
        throw new Error('Failed to add item to cart');
      }
      setButtonText('Adding ...');
      setTimeout(() => {
        navigate('/shoppingcart');
      }, 1500);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      alert(`Failed to add item to cart: ${error.message}`);
      setButtonText('Add to Cart');
    } finally {
      setAdding(false);
    }
  };

  if (!item) {
    return <div>Loading item details...</div>;
  }

  if (status) {
    return (
        <Container>
          <h2>{item.title}</h2>
          <h3>${(item.price / 100).toFixed(2)}</h3>
          <Row>
            <Col md={6}>
              <img src={item.imageUrl} alt={item.title} style={{ width: '100%' }} />
            </Col>
            <Col md={6}>
              <p>{item.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Button onClick={() => navigate(-1)}>Back to Store</Button>
                <Button disabled={adding} onClick={addToCart}>{buttonText}</Button>
              </div>
            </Col>
          </Row>
        </Container>
    );
  } else {
    return (
        <div>
          <APIModeAlert />
          <LoginAlert />
        </div>
    );
  }
};
