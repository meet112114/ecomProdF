import React, { useContext, useEffect, useState } from 'react';
import './order.css';
import { UserContext } from '../../App';
import Item from '../../components/orderItem/orderItem';
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState({}); // Initialize orders as an empty object
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        const token = localStorage.getItem('jwtoken');

        if (token) {
            dispatch({ type: 'USER', payload: true });
        } else {
            dispatch({ type: 'USER', payload: false });
            navigate('/login');
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('jwtoken');
            try {
                const response = await fetch('https://ecomprodb.onrender.com/get/orders', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                console.log(data);
                setOrders(data); // Set the orders object
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div>Loading orders...</div>;
    if (error) return <div>Error: {error}</div>;

    // Extract order entries (values) from the orders object
    const orderEntries = Object.values(orders);

    return (
        <div>
            <div className='orders-title'>Your Orders</div>
            {orderEntries.length > 0 ? (
                <div className='Orders-container'>
                    {orderEntries.map((order) => (
                        <div className='order-container' key={order._id}>
                            <div className='order-info'>
                                <div><strong>Order ID :</strong> {order._id}</div>
                                <div><strong>Total Amount :</strong> ₹ {order.amountTotal}</div>
                                <div><strong>Email: </strong>{order.customerEmail}</div>
                                <div><strong>Status :</strong> {order.status}</div>
                            </div>
                            
                            <div className='order-items'>
                                <div className='item-title'><strong>Items</strong></div>
                                <div className='items-list'>
                                    {order.items.map(item => (
                                        <Item key={item._id} item={item} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default Order;
