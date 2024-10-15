import React, { useContext, useEffect, useState } from 'react';
import './order.css';
import { UserContext } from '../../App';
import Item from '../../components/orderItem/orderItem';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode'; // Ensure you import jwt-decode

const Order = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState({}); // Initialize orders as an empty object
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error handling
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        const token = localStorage.getItem('jwtoken'); // Retrieve the token from local storage

        if (token) {
            // If token exists, dispatch user information (this assumes you have user info in the token)
            const decodedToken = jwt(token); // Decode the token to get user info (ensure the jwt-decode library is installed)
            dispatch({ type: 'USER', payload: decodedToken }); // Dispatch user data
        } else {
            // If no token, set user to null and redirect to login
            dispatch({ type: 'USER', payload: null });
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [dispatch, navigate]); // Dependencies

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('jwtoken'); // Retrieve token again for fetch call
            if (!token) return; // Exit early if no token

            try {
                const response = await fetch('https://ecomprodb.onrender.com/get/orders', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                        'Content-Type': 'application/json', // Specify the content type
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                
                const data = await response.json();
                console.log(data); // Log fetched data for debugging
                setOrders(data); // Update the orders state
            } catch (err) {
                console.error(err);
                setError(err.message); // Set the error message
            } finally {
                setLoading(false); // Stop loading after fetching
            }
        };

        fetchOrders(); // Call fetchOrders function
    }, []); // Ensure to run this only once on component mount

    // Render loading state
    if (loading) return <div>Loading orders...</div>;
    // Render error state
    if (error) return <div>Error: {error}</div>;

    // Extract order keys for mapping
    const orderKeys = Object.keys(orders);

    return (
        <div>
            <div className='orders-title'>Your Orders</div>
            {orderKeys.length > 0 ? ( // Check if there are any orders
                <div className='Orders-container'>
                    {orderKeys.map((orderId) => {
                        const order = orders[orderId];
                        return (
                            <div className='order-container' key={orderId}> {/* Use orderId for the key */}
                                <div className='order-info'>
                                    <div><strong>Order ID :</strong> {orderId}</div>
                                    <div><strong>Total Amount :</strong> ₹ {order.amountTotal}</div>
                                    <div><strong>Email: </strong>{order.customerEmail}</div>
                                    <div><strong>Status :</strong> {order.status}</div>
                                </div>
                                
                                <div className='order-items'>
                                    <div className='item-title'><strong>Items</strong></div>
                                    <div className='items-list'> {/* Added a new wrapper for scrolling */}
                                        {order.items.map(item => (
                                            <Item key={item._id} item={item} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>No orders found.</p> // Show this only if there are no orders after loading
            )}
        </div>
    );
};

export default Order;
