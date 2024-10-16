import React, { useContext, useEffect, useState } from 'react';
import './order.css';
import { UserContext } from '../../App';
import Item from '../../components/orderItem/orderItem';
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        const token = localStorage.getItem('jwtoken'); // Retrieve the token from local storage

        if (token) {
            dispatch({ type: 'USER', payload: true  }); // Dispatch user data
        } else {
            // If no token, set user to null and redirect to login
            dispatch({ type: 'USER', payload: false });
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [dispatch, navigate]); // Dependencies

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('jwtoken');
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
                console.log(data); 
                setOrders(data);
                console.log(orders);
               
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

    return (
        <div>
            <div className='orders-title'>Your Orders</div>
            {orders.length > 0 ? ( 
                <div className='Orders-container'>
                    {orders.map((orderId) => {
                        const order = orders[orderId];
                        return (
                            <div className='order-container' key={order._id}>
                                <div className='order-info'>
                                    <div><strong>Order ID :</strong> {orderId}</div>
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
