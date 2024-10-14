import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './singleProduct.css';
import { ClipLoader } from 'react-spinners'; // Example spinner component

const SingleProduct = () => {
  const [productData, setProductData] = useState(null);
  const [gridLoading, setGridLoading] = useState(true);
  const [mainImg, setMainImg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [availableSize, setAvailableSize] = useState([]);

  const params = useParams();
  const id = params.id;

  // Fetch product data based on the product ID
  const getProjects = async () => {
    try {
      const res = await fetch(`/get/product/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (res.status !== 200) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      console.log(data);
      setProductData(data);
      setGridLoading(false);
      setMainImg(data.imagesUrl && data.imagesUrl.length > 0 ? data.imagesUrl[0] : data.image_url); // Set main image
      setIsLoading(false); // Stop showing the spinner
    } catch (err) {
      console.error(err);
      setGridLoading(false);
    }
  };

  
  useEffect(() => {
    setProductData(null); // Clear previous product data
    setMainImg(''); // Clear main image
    setAvailableSize(''); // Clear selected color
    setAvailableSize([]); // Clear sizes
    setIsLoading(true); // Show loading spinner
    setGridLoading(true); // Reset grid loading

    // Fetch new product data
    getProjects();
  }, [id]);

  // Color selection component
  const ColorSection = ({ variants }) => {
    const handleColorChange = (color) => {
      setSelectedColor(color); // Set the selected color when user clicks
      const selectedVariant = variants.find(variant => variant.color === color);
      setAvailableSize(selectedVariant ? selectedVariant.sizes : []); // Set available sizes for the selected color
      setSelectedSize(""); // Clear any previously selected size
    };
  
    return (
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        {variants.map((variant, index) => (
          <div
            key={index}
            onClick={() => handleColorChange(variant.color)}
            style={{
              backgroundColor: variant.color.toLowerCase(),
              border: selectedColor === variant.color ? '3px solid black' : '1px solid gray', // Apply active style if selected
              width: '35px',
              height: '35px',
              cursor: 'pointer',
              borderRadius: '50px',
            }}
          />
        ))}
      </div>
    );
  };


  const selectSize = (size) => {
    setSelectedSize(size)
  }

  console.log(selectedSize)

  // Size display component
  const SizeSection = () => {
    return (
      <div style={{ marginTop: '5px' , marginLeft:"40px" }}>
        <h4>Sizes:</h4>
        {availableSize.length > 0 ? (
          <div style={{ display: 'flex', gap: '10px' }}>
            {availableSize.map((size, index) => (
              <div key={index} onClick={() => selectSize(size)} 
              style={{ border: '1px solid black', 
                      padding: '5px 10px', 
                      backgroundColor: size.stock < 1 ? 'red' : 'white', 
                      border: selectedSize.size === size.size ? '3px solid black' : '1px solid gray'
                       }}>
                {size.size}
              </div>
            ))}
          </div>
        ) : (
          <p>No sizes available for this color.</p>
        )}
      </div>
    );
  };

  // Image grid component
  const ImageGrid = ({ data }) => {
    const changeMainImg = () => {
      setMainImg(data);
    };

    return (
      <div onClick={changeMainImg} className='image_grid-image'>
        <img src={data} alt='Product' />
      </div>
    );
  };

  const addToCart = async() => {
    if(productData && selectedColor && selectedSize){
      try{
        const res = await fetch('/add/cart' , {
          method:"POST",
          headers:{
              "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            productId: productData._id,
            color: selectedColor,
            size: selectedSize.size
          })
      });
      if(res.ok){
        window.alert("Added successfully")
      }
      }catch(e){
        console.log(e)
      }
    }else{
      window.alert("select size")
    }
  }

  return (
    <div className='main-container'>
      {isLoading ? (
        <ClipLoader size={50} color={'#000'} loading={isLoading} />
      ) : (
        <>
          <div className='image-section'>
            <div className='main-image'>
              <img
                className='image'
                loading='lazy'
                src={mainImg}
                alt='img not available'
              />
            </div>

            <div className='sec-image-grid'>
              {!gridLoading && productData && productData.imagesUrl && productData.imagesUrl.length > 0 ? (
                productData.imagesUrl.map((data, index) => <ImageGrid key={index} data={data} />)
              ) : gridLoading ? (
                <p>Loading images...</p>
              ) : (
                <p>No images available.</p>
              )}
            </div>
          </div>

          <div className='information-section'>
            <div className='product-name'>Name: {productData?.name || 'Product Name'}</div>
            <div className='product-model'>Model: {productData?.model || 'Product Model'}</div>
            <div className='product-category'>Category: {productData?.category || 'Category'}</div>
            <div className='product-price'>Price: ₹{productData?.price || 'Price'}</div>
            <div className='product-description'>{productData?.description || 'Description'}</div>

            {/* Color selection component */}
            {productData?.variants && productData.variants.length > 0 && (
              <ColorSection variants={productData.variants} />
            )}

     
            <SizeSection />

            <button  style={{
              width:"200px",
              height:"50px",
              marginLeft:"50px",
              backgroundColor:"gray",
              color:"white"

            }} onClick={addToCart}>
                Add to Cart
            </button> 
              
            

          </div>
        </>
      )}
    </div>
  );
};

export default SingleProduct;