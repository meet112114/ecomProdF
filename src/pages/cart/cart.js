import React, { useEffect, useState } from 'react';
import "./cart.css"

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [productDetails, setProductDetails] = useState({});
    const [totalPrice, setTotalPrice] = useState(0); // State to track the total price

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('/get/cart'); // Replace with your actual endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }
                const data = await response.json();
                setCartItems(data); // Adjust this based on the actual response structure
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const details = {};
            let priceSum = 0; // Initialize price accumulator

            for (const item of cartItems) {
                try {
                    const response = await fetch(`/get/product/${item.productId}`); // Adjust endpoint
                    if (!response.ok) {
                        throw new Error(`Failed to fetch product ${item.productId}`);
                    }
                    const product = await response.json();
                    details[item.productId] = product; // Store product details by ID
                    
                    // Add the product price to the total price
                    priceSum += product.price * (item.quantity || 1); // Multiply by quantity if applicable
                } catch (err) {
                    console.error(err.message);
                }
            }

            setProductDetails(details);
            setTotalPrice(priceSum); // Set the total price
        };

        if (cartItems.length > 0) {
            fetchProductDetails();
        }
    }, [cartItems]);

    if (loading) return <div>Loading cart...</div>;
    if (error) return <div>{error}</div>;

    const deleteCartItem = async (item) => {
        try {
            const res = await fetch(`/delete/cart-item/${item._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.ok) {
                setCartItems(prevItems => prevItems.filter(cartItem => cartItem._id !== item._id));
                // After deleting, update the total price
                setTotalPrice(prevTotal => prevTotal - (productDetails[item.productId]?.price || 0) * (item.quantity || 1));
            } else {
                console.error('Failed to delete the item from the cart.');
            }
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };

    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item._id} className="cart-item">
                            {productDetails[item.productId] ? (
                                <>
                                    <img
                                        src={productDetails[item.productId].image_url} 
                                        alt={productDetails[item.productId].name} // Assuming the product name is stored in name
                                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                    />
                                    <p><strong>Product Name:</strong> {productDetails[item.productId].name}</p>
                                    <p><strong>Color:</strong> {item.color}</p>
                                    <p><strong>Size:</strong> {item.size}</p>
                                    <p><strong>Price:</strong> ${productDetails[item.productId].price}</p>
                                    <button onClick={() => deleteCartItem(item)}>Delete</button>
                                </>
                            ) : (
                                <p>Loading product details...</p>
                            )}
                        </div>
                    ))}
                    <div className="total-price">
                        <h3>Total Price: ${totalPrice.toFixed(2)}</h3> {/* Display total price */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;