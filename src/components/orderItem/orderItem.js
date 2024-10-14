import React, { useEffect, useState } from 'react';
import "./orderItem.css"

const Item = ({ item }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/get/product/${item.productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [item.productId]);

    if (loading) return <div>Loading item...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div className='item-container'>
            <div className='image-section1'>
                <div className='image-div1'>
                    <img src={product.image_url} alt=''/>
                </div>
            </div>
            <div className='info-container1'>
            <div><strong>Name : </strong> {product.name}</div>
            <div><strong>Color : </strong> {item.color}</div>
            <div><strong>Size : </strong>{item.size}</div>
            </div>
            
        </div>
    );
};

export default Item;