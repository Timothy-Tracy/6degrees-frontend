import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
    const navigate = useNavigate();

    return (
        <Container className="text-center mt-5">
            <Row>
                <Col>
                    <h1>Order Confirmed!</h1>
                    <p>Your order has been successfully placed and is on its way to being processed!</p>

                    <p>Please check your email for Order Details.</p>

                    <p>Thank you for shopping at Beta Leather.</p>

                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '5px'}}>
                        <Button color="success" onClick={() => navigate('/orders')}>Go To Orders</Button>
                        <Button color="success" onClick={() => navigate('/')}>Continue Shopping</Button>
                    </div>
                </Col>
            </Row>
        </Container>
);
};

export default OrderSuccess;
