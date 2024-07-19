import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardGroup,
    Button,
    Row,
    Col,
    Input,
    Container,
    Label,
    Form,
    Alert
} from "reactstrap"



import { useUser } from "../../context/UserContext";
import { useNavigate } from 'react-router-dom'; //
import { useState, useEffect } from "react";
import {LoginAlert} from "../EnsureLogin";
import { useDebug } from "../../context/DebugContext";
import APIModeAlert from "../APIModeAlert";
import { useAPI } from "../../context/APIContext";
import { ShoppingCart } from "./ShoppingCart.js";
import { AccountInfoObject } from "./MyAccount.js";
import axios from 'axios';




const CheckoutPage = () => {
    const x = "<CheckoutPage>"
    const { APIMode } = useAPI();
    const { user, status } = useUser();
    const { debug } = useDebug()
    debug("Rendered", x)


    const Checkout = () => {
        const navigate = useNavigate(); // Initialize useNavigate
        const [cartItems, setCartItems] = useState([]);
        const [confirmOrderData, setConfirmOrderData] = useState(
            {
                firstName:'',
                lastName:'',
                streetAddress:'',
                state : '',
                city:'',
                zipCode:'',
                creditCardNumber: '',
                cvv: '',
                expirationDate: '',
            }
        );
        const [message, setMessage] = useState("Please fill the form.");
        const [messageType, setMessageType] = useState("danger");


        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:5454/api/cart/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 200) {
                    setCartItems(response.data.cartItems); // Assuming the API returns an object with a cartItems array
                } else {
                    throw new Error('Failed to fetch cart items');
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setMessage("Failed to load cart items");
                setMessageType("danger");
            }
        };

        useEffect(() => {
            fetchCartItems();
        }, []);


        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5454/api/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data && response.data.addresses && response.data.addresses.length > 0) {
                    const userData = response.data;
                    const primaryAddress = userData.addresses[0];
                    setConfirmOrderData({
                        firstName: userData.firstName || '',
                        lastName: userData.lastName || '',
                        streetAddress: primaryAddress.streetAddress || '',
                        city: primaryAddress.city || '',
                        state: primaryAddress.state || '',
                        zipCode: primaryAddress.zipCode || '',
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        useEffect(() => {
            fetchUserData();
        }, []);



        const tryConfirmOrder = async () => {
            debug("Attempting to confirm order...");
            if (!user) {
                setMessage("You need to be logged in to confirm order.");
                setMessageType("danger");
                return;
            }

            try {
                const response = await axios.post('http://localhost:5454/api/orders/', confirmOrderData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    setMessage("Success!");
                    setMessageType("success");

                    deleteCartItems(cartItems).then(() => {
                        navigate('/order-success'); // Navigate to the orders page after all items are deleted
                    }).catch((error) => {
                        console.error('Error while deleting cart items:', error);
                    });
                } else {
                    throw new Error('Failed to confirm order');
                }

            } catch (error) {
                debug("Order confirmation failed:", error);
                setMessage(`Failed to confirm order: ${error.message}`);
                setMessageType("danger");
            }
        }

        const deleteCartItems = async (cartItems) => {
            const token = localStorage.getItem('token'); // Get the token once outside the loop
            for (const item of cartItems) {
                try {
                    const response = await axios.delete(`http://localhost:5454/api/cart_items/${item.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    // Check if the status code is outside the successful range
                    if (response.status < 200 || response.status >= 300) {
                        console.error(`Error deleting cart item with ID: ${item.id} - Status: ${response.status}`);
                    }
                } catch (error) {
                    // Log more detailed error information
                    if (error.response) {
                        console.error(`Failed to delete cart item with ID: ${item.id} - Status: ${error.response.status}`, error.response.data);
                    } else if (error.request) {
                        console.error('No response received:', error.request);
                    } else {
                        console.error('Error', error.message);
                    }
                }
            }
            setCartItems([]); // Clear the local cart items state after all are deleted
        };





        const ensureValidFormData = (event) => {
            debug("ensureValidFormData")
            if (!(confirmOrderData.state == "" || confirmOrderData.city == "" || confirmOrderData.zipCode == "" || confirmOrderData.streetAddress == "" || confirmOrderData.firstName == "" || confirmOrderData.lastName == "")) {
                setMessageType("success")

                setMessage("Loading ...")
                tryConfirmOrder();
            } else {
                debug("Form Data Invalid")
                setMessageType("danger")
                setMessage("Form Data Invalid")
            }
        }

        const handleConfirmOrder = (event) => {
            event.preventDefault()
            debug("handleConfirmOrder")
            setMessageType("success")
            setMessage("Handling Confirm Order")
            ensureValidFormData(event);

        }

        return(
            <div>
                <Form onSubmit={(event) => handleConfirmOrder(event)}>
                    <Container>
                        <Row className="justify-content-between align-items-center">
                        </Row>
                        <Row>
                            <Col>
                                <Container style={{ padding: '1rem' }}>
                                    <Row style={{ padding: '1.5rem 0', textAlign: 'center' }}>
                                        <h3 style={{ width: '100%' }}>Order Items</h3>
                                    </Row>
                                    <Row>
                                        <ShoppingCart></ShoppingCart>
                                    </Row>
                                </Container>
                            </Col>
                            <Col lg="6">
                                <Container style={{ padding: '1rem' }}>
                                    <Row style={{ padding: '1rem', textAlign: 'center' }}>
                                        <h3 style={{ width: '100%' }}>Personal Details</h3>
                                    </Row>
                                    <Container style={{ padding: '1rem' }}>
                                        <Row style={{ padding: '0.5rem' }}>
                                            <Col>
                                                <div style={{ marginBottom: '10px' }}>
                                                    <label style={{ fontWeight: 'bold', display: 'block', fontFamily: 'Arial, sans-serif' }}>First Name</label>
                                                    <AccountInfoObject
                                                        editMode={true}
                                                        onChange={(e) => setConfirmOrderData({...confirmOrderData, firstName: e.target.value})}
                                                        id="firstName"
                                                        name="firstName"
                                                        content={confirmOrderData.firstName}
                                                        type="text"
                                                        style={{ width: '100%', padding: '10px', margin: '5px 0', display: 'inline-block', boxSizing: 'border-box' }} />
                                                </div>
                                            </Col>
                                            <Col>
                                                <div style={{ marginBottom: '10px' }}>
                                                    <label style={{ fontWeight: 'bold', display: 'block', fontFamily: 'Arial, sans-serif' }}>Last Name</label>
                                                    <AccountInfoObject
                                                        editMode={true}
                                                        onChange={(e) => setConfirmOrderData({...confirmOrderData, lastName: e.target.value})}
                                                        id="lastName"
                                                        name="lastName"
                                                        content={confirmOrderData.lastName}
                                                        type="text"
                                                        style={{ width: '100%', padding: '10px', margin: '5px 0', display: 'inline-block', boxSizing: 'border-box' }} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                    <Row style={{ padding: '1.5rem 0', textAlign: 'center' }}>
                                        <h3 style={{ width: '100%' }}>Address Information</h3>
                                    </Row>
                                    <Row style={{ padding: '0.5rem' }}>
                                        <Col>
                                            <div style={{ marginBottom: '10px' }}>
                                                <label style={{ fontWeight: 'bold', display: 'block', fontFamily: 'Arial, sans-serif' }}>Street Address</label>
                                                <AccountInfoObject
                                                    editMode={true}
                                                    onChange={(e) => setConfirmOrderData({...confirmOrderData, streetAddress: e.target.value})}
                                                    id="streetAddress"
                                                    name="streetAddress"
                                                    content={confirmOrderData.streetAddress}
                                                    type="text"
                                                    style={{ width: '100%', padding: '10px', margin: '5px 0', display: 'inline-block', boxSizing: 'border-box' }} />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div style={{ marginBottom: '10px' }}>
                                                <label style={{ fontWeight: 'bold', display: 'block', fontFamily: 'Arial, sans-serif' }}>City</label>
                                                <AccountInfoObject
                                                    editMode={true}
                                                    onChange={(e) => setConfirmOrderData({...confirmOrderData, city: e.target.value})}
                                                    id="city"
                                                    name="city"
                                                    content={confirmOrderData.city}
                                                    type="text"
                                                    style={{ width: '100%', padding: '10px', margin: '5px 0', display: 'inline-block', boxSizing: 'border-box' }} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: '0.5rem' }}>
                                        <Col>
                                            <div style={{ marginBottom: '10px' }}>
                                                <label style={{ fontWeight: 'bold', display: 'block', fontFamily: 'Arial, sans-serif' }}>State</label>
                                                <AccountInfoObject
                                                    editMode={true}
                                                    onChange={(e) => setConfirmOrderData({...confirmOrderData, state: e.target.value})}
                                                    id="state"
                                                    name="state"
                                                    content={confirmOrderData.state}
                                                    type="text"
                                                    style={{ width: '100%', padding: '10px', margin: '5px 0', display: 'inline-block', boxSizing: 'border-box' }} />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div style={{ marginBottom: '10px' }}>
                                                <label style={{ fontWeight: 'bold', display: 'block', fontFamily: 'Arial, sans-serif' }}>Zip Code</label>
                                                <AccountInfoObject
                                                    editMode={true}
                                                    onChange={(e) => setConfirmOrderData({...confirmOrderData, zipCode: e.target.value})}
                                                    id="zipCode"
                                                    name="zipCode"
                                                    content={confirmOrderData.zipCode}
                                                    type="text"
                                                    style={{ width: '100%', padding: '10px', margin: '5px 0', display: 'inline-block', boxSizing: 'border-box' }} />
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                                <Container>
                                    <Row style={{ textAlign: 'center', marginTop: '30px', marginBottom: '10px' }}>
                                        <h3>Payment Information</h3>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div style={{ marginBottom: '10px' }}>
                                                <label style={{ fontWeight: 'bold', display: 'block', fontFamily: 'Arial, sans-serif' }}>Credit Card Number</label>
                                                <Input
                                                    type="text"
                                                    placeholder="xxxx xxxx xxxx xxxx"
                                                    value={confirmOrderData.creditCardNumber}
                                                    onChange={(e) => setConfirmOrderData({...confirmOrderData, creditCardNumber: e.target.value})}
                                                    style={{ width: '100%', padding: '10px', margin: '5px 0', display: 'inline-block', boxSizing: 'border-box' }}
                                                />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div style={{ marginBottom: '10px' }}>
                                                <label style={{ fontWeight: 'bold', display: 'block', fontFamily: 'Arial, sans-serif' }}>CVV</label>
                                                <Input
                                                    type="text"
                                                    placeholder="xxx"
                                                    value={confirmOrderData.cvv}
                                                    onChange={(e) => setConfirmOrderData({...confirmOrderData, cvv: e.target.value})}
                                                    style={{ width: '100%', padding: '10px', margin: '5px 0', display: 'inline-block', boxSizing: 'border-box' }}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div style={{ marginBottom: '10px' }}>
                                                <label style={{ fontWeight: 'bold', display: 'block', fontFamily: 'Arial, sans-serif' }}>Expiration Date</label>
                                                <Input
                                                    type="text"
                                                    placeholder="mm/yy"
                                                    value={confirmOrderData.expirationDate}
                                                    onChange={(e) => setConfirmOrderData({...confirmOrderData, expirationDate: e.target.value})}
                                                    style={{ width: '100%', padding: '10px', margin: '5px 0', display: 'inline-block', boxSizing: 'border-box' }}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Alert color={messageType} className="w-100">{message}</Alert>
                            </Col>
                        </Row>
                        <Row className="mt-3">  {/* Add margin top for spacing */}
                            <Col className="text-center">
                                <Button type="submit" color="success" className="w-100">Confirm Order</Button>
                            </Col>
                        </Row>
                        <Row className="mt-3">  {/* Add margin top for spacing */}
                            <Col className="text-center">
                                <Button onClick={() => navigate('/shoppingcart')} color="danger" className="w-100">
                                    Back to Cart
                                </Button>
                            </Col>
                        </Row>

                    </Container>
                </Form>
            </div>
        )
    }

    if (status){
        return(
            <Container>
                <APIModeAlert></APIModeAlert>
                <h2>Checkout</h2>
                <Checkout />
            </Container>
        )
    } else {
        return (
            <div>
                <APIModeAlert></APIModeAlert>
                <LoginAlert></LoginAlert>
            </div>
        )
    }
}

export default CheckoutPage;