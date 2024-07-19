
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Table,
    Button,
    Row,
    Col,
    Alert
} from "reactstrap";
import { Link } from "react-router-dom";
import EnsureLogin from "../../components/EnsureLogin";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useDebug } from "../../context/DebugContext";
import { useAPI } from "../../context/APIContext";
// NOTE FOR TIM: ADDED THESE TWO IMPORTS
import { cart1 } from "../../assets/fakedata/FakeCart.js"
import APIModeAlert from "../APIModeAlert";

/*
Cart Item
        this.id = id;
        this.cart = cart;
        this.product = product;
        this.quantity = quantity;
        this.price = price;
        this.discountedPrice = discountedPrice;
        this.userId = userId;
*/



export const ShoppingCart = () => {
    const [cart, setCart] = useState(null);
    const { API, APIMode } = useAPI();
    const [output, setOutput] = useState();
    const { token } = useUser();
    const { debug } = useDebug();

    const formatPriceWithDecimal = (priceInCents) => {
        // Convert cents to dollars and ensure two decimal places
        return (priceInCents / 100).toFixed(2);
    };

    // Function to fetch the cart data from the server
    const fetchCart = async () => {
        debug("Attempting to fetch cart...");
        if (!token) {
            debug("No token available");
            setOutput(<Alert color="warning">You need to be logged in to view the cart.</Alert>);
            return;
        }

        try {
            const response = await fetch(`${API}/api/cart/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const cartData = await response.json();
            debug("Cart fetched successfully. Number of items: " + cartData.cartItems.length);
            setCart(cartData);
        } catch (error) {
            debug(`Failed to fetch cart: ${error.message}`);
            setOutput(<Alert color="danger">Failed to load cart: {error.message}</Alert>);
        }
    };


    // Function to handle removing a cart item
    const handleRemoveCartItem = async (cartItemId) => {
        debug(`Attempting to remove cart item with ID: ${cartItemId}`);
        if (!token) {
            debug("No token available");
            setOutput(<Alert color="warning">You need to be logged in to modify the cart.</Alert>);
            return;
        }

        try {
            const response = await fetch(`${API}/api/cart_items/${cartItemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            debug("Cart item removed successfully");
            fetchCart(); // Re-fetch the cart to update the UI
        } catch (error) {
            debug(`Failed to remove cart item: ${error}`);
            setOutput(<Alert color="danger">Failed to remove item from cart: {error.message}</Alert>);
        }
    };

    const ShoppingCartItemCard = (props) => {
        return (
            <tr className="border-top">
                <td>
                    <div className="d-flex align-items-center p-2">
                        <div>
                            <h6 className="mb-0">{props.cartItem.product.title}</h6>
                        </div>
                    </div>
                </td>
                <td>{props.cartItem.quantity}</td>
                <td>$ {formatPriceWithDecimal(props.cartItem.price)}</td>
                <td>
                    <Button className='text-light' color='danger' onClick={() => handleRemoveCartItem(props.cartItem.id)}>
                        Remove
                    </Button>
                </td>
            </tr>
        );
    };


    useEffect(() => {
        debug("Checking API mode and cart status...");
        if (APIMode) {
            fetchCart();
        } else {
            setCart(cart1) // Assumes cart1 is some mock data you want to use in non-API mode
        }
    }, [APIMode]);

    useEffect(() => {
        if (cart != null) {
            debug("useEffect([cart]) - cart is not null")
            setOutput(
                <div>
                    
                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.cartItems.map((cartItem, index) => (
                                <ShoppingCartItemCard
                                    key={index}
                                    cartItem={cartItem}
                                />
                            ))}
                        </tbody>
                    </Table>
                    <Row>
                        <Col className="text-center">
                            <h5>Total Items {cart.totalItem}</h5>
                        </Col>
                        <Col className="text-center">
                            <h5>Total Price $ {formatPriceWithDecimal(cart.totalPrice)}</h5>
                        </Col>
                    </Row>
                </div>
            );
        } else {
            debug("useEffect([cart]) cart is null")
            setOutput(<Alert color="warning">Your cart is loading.</Alert>);
        }
    }, [cart]);

    return output;
};
const ShoppingCartPage = () => {
    const { status } = useUser();
    const { debug } = useDebug();
    const [output, setOutput] = useState('');

    useEffect(() => {
        setOutput(
            <EnsureLogin component={
                <div>
                    <APIModeAlert />
                    <Row className='text-center'>
                        <h2>Your Shopping Cart</h2>
                    </Row>
                    <ShoppingCart />
                    <Row className="text-center mt-4">
                        <Col xs="6">
                            <Button color="primary" className="btn-block">
                                <Link to="/checkout" className="nav-link text-white">
                                    Checkout
                                </Link>
                            </Button>
                        </Col>
                        <Col xs="6">
                            <Button color="secondary" className="btn-block">
                                <Link to="/store" className="nav-link text-white">
                                    Continue Shopping
                                </Link>
                            </Button>
                        </Col>
                    </Row>
                </div>
            } />
        );
        debug(`Status changed. Status is ${status} so I'm changing output.`);
    }, [status]);

    return output;
};

export default ShoppingCartPage;