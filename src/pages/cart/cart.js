import React, { useEffect, useState } from 'react';
import "./cart.css"
import image from '../../assets/images/delete.png';
import cart from '../../assets/images/cart.png'

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [productDetails, setProductDetails] = useState({});
    const [totalPrice, setTotalPrice] = useState(0); // State to track the total price

    useEffect(() => {
    const fetchCartItems = async () => {
    const token = localStorage.getItem('jwtoken');
    console.log(token)
    if (!token) {
        throw new Error('No token found, please log in again.');
    }

    try {
        const response = await fetch('https://ecomprodb.onrender.com/get/cart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Correctly include the Bearer token
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cart items');
        }

        const data = await response.json();
        setCartItems(data); // Assuming data contains your cart items
    } catch (err) {
        console.error('Error fetching cart items:', err);
        setError(err.message); // Assuming you have setError defined to handle errors
    } finally {
        setLoading(false); // Assuming you have setLoading defined to manage loading state
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
                    const response = await fetch(`https://ecomprodb.onrender.com/get/product/${item.productId}`); // Adjust endpoint
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
        const token = localStorage.getItem('jwtoken');
        try {
            const res = await fetch(`https://ecomprodb.onrender.com/delete/cart-item/${item._id}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Correctly include the Bearer token
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

    const checkout = async() => {
        const token = localStorage.getItem('jwtoken');
        const baseUrl = window.location.origin;
        console.log(baseUrl);
        try{
            const res = await fetch("https://ecomprodb.onrender.com/checkout" , {
                method:"POST",
               headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
                body: JSON.stringify({
                    cartItems,
                    baseUrl
                })
            })
            .then(res => {
                if(res.ok) return res.json()
                    return res.json().then(json => Promise.reject(json))
            })
            .then(({url})=> {
                window.location = url
            })
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className="cart-container">
            <div className='cart-title'>Your Shopping Cart</div>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-container">
                    {cartItems.map((item) => (
                        <div key={item._id} className="cart-item">
                            {productDetails[item.productId] ? (
                                <>
                                    <div className="cart-item-image">
                                        <img
                                            src={"https://ecomprodb.onrender.com" + productDetails[item.productId].image_url}
                                            alt={productDetails[item.productId].name}
                                            className="product-image"
                                        />
                                    </div>

                                    <div className="cart-item-details">
                                        <div className="cart-item-name">
                                            <strong>Product Name:</strong> {productDetails[item.productId].name}
                                        </div>
                                        <div className="cart-item-color">
                                            <strong>Color:</strong> {item.color}
                                        </div>
                                        <div className="cart-item-size">
                                            <strong>Size:</strong> {item.size}
                                        </div>
                                        <div className="cart-item-price">
                                            <strong>Price:</strong> ₹{productDetails[item.productId].price}
                                        </div>
                                    </div>

                                    <div className="cart-item-delete">
                                        <img
                                            src={image}
                                            alt="Delete item"
                                            className="delete-button"
                                            onClick={() => {
                                                const confirmDelete = window.confirm("Are you sure you want to delete this item?");
                                                if (confirmDelete) {
                                                    deleteCartItem(item);
                                                }
                                            }}
                                        />
                                    </div>
                                </>
                            ) : (
                                <p>Loading product details...</p>
                            )}
                        </div>
                    ))}
                    <div className='payment-sec'>

                    <div className="total-price-container">
                        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                    </div>
                    <div className="checkout-container">
                        <img onClick={checkout} src={cart}/>
                    </div>
                      
                    </div>
                    
                </div>
            )}
        </div>
    );
};

export default Cart;
