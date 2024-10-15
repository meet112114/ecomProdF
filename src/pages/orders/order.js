import React, { useContext, useEffect, useState } from 'react';
import './order.css';
import { UserContext } from '../../App';
import Item from '../../components/orderItem/orderItem';
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState({}); // Initialize orders as an empty object
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error handling
    const  {state , dispatch} = useContext( UserContext);

    useEffect(() => {
        const verifyUser = async () => {
          try {
            const res = await fetch('/auth/verify', {
              method: 'GET',
              credentials: 'include', // This ensures cookies are sent with the request
            });
    
            if (res.status === 200) {
              const data = await res.json();
              dispatch({ type: 'USER', payload: data.user }); // Assuming server sends user data
            } else {
              dispatch({ type: 'USER', payload: null }); // If not authenticated, set user to null
              navigate('/login'); // Redirect to login if not authenticated
            }
          } catch (error) {
            console.error('Error verifying user:', error);
            dispatch({ type: 'USER', payload: null });
          }
        };
    
        verifyUser();
      }, [dispatch, navigate]);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/get/orders'); 
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

        fetchOrders();
    }, []);

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
                            <div className='order-container' key={order._id}>
                                <div className='order-info'>
                                    <div><strong>Order ID :</strong> {orderId}</div>
                                    <div><strong>Total Amount :</strong> ₹ {order.amountTotal}</div>
                                    <div><strong>Email: </strong>{order.customerEmail}</div>
                                    <div><strong>Status :</strong> {order.status}</div>
                                </div>
                                
                                <div className='order-items'>
                                    <div className='item-title' ><strong>Items</strong></div>
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