import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { useState, useEffect } from "react";
import EnsureLogin from "../../components/EnsureLogin";
import { useUser } from "../../context/UserContext";
import { useDebug } from "../../context/DebugContext";
import { useAPI } from "../../context/APIContext";
import APIModeAlert from "../APIModeAlert";

const OrderPage = () => {
    const { API, APIMode } = useAPI();
    const { status, token } = useUser();
    const { debug } = useDebug();
    const [orderData, setOrderData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const formatPriceWithDecimal = (priceInCents) => {
        // Convert cents to dollars and ensure two decimal places
        return (priceInCents / 100).toFixed(2);
    };

    const fetchOrders = async () => {
        if (!status) {
            debug("fetchOrders - No token available");
            return;
        }
        try {
            const response = await fetch(`${API}/api/orders/user`, {
                headers: { 'Authorization': `Bearer ${ token }` }
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const orders = await response.json();
            setOrderData(orders);
        } catch (error) {
            debug(`fetchOrders - Failed to fetch orders: ${error}`);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [API, status, debug]);

    return (
        <EnsureLogin component={
            <div>
                <APIModeAlert />
                <h2>Orders</h2>
                <input
                    type="number"
                    placeholder="Search by Order #"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ marginBottom: '20px', width: '100%', padding: '10px' }}
                />
                <div>
                    {orderData.map((order, index) => {
                        if (searchQuery && (order.id).toString() !== searchQuery) {
                            return null; // skip rendering this order
                        }
                        return (
                            <div key={index}>
                                <Card>
                                    <CardBody>
                                        <CardTitle tag="h5">Order #{order.id}</CardTitle>
                                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                                            Order placed on {order.createdAt}
                                        </CardSubtitle>
                                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                                            Order delivered on {order.deliveryDate || 'Pending'}
                                        </CardSubtitle>
                                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                                            Shipping Address {order.shippingAddress.streetAddress}, {order.shippingAddress.city}
                                        </CardSubtitle>
                                        <Table className="no-wrap mt-3 align-middle" responsive borderless>
                                            <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Quantity</th>
                                                <th>Delivery Date</th>
                                                <th>Amount Paid</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {order.orderItems.map((item, itemIndex) => (
                                                <tr className="border-top" key={itemIndex}>
                                                    <td>{item.product.title}</td>
                                                    <td>x{item.quantity}</td>
                                                    <td>{item.deliveryDate || 'Pending'}</td>
                                                    <td>$ {formatPriceWithDecimal(item.price)}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                                            Total Price $ {formatPriceWithDecimal(order.totalPrice)}

                                        </CardSubtitle>
                                    </CardBody>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        } />
    );
};

export default OrderPage;
