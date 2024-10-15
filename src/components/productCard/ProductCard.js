import React, { useState } from 'react'
import './productCard.css'
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const ProductCard = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };


  return (
    <Link
      to={{
        pathname: `/product/${data._id}`,
      }}
      className="ProductLink"
    >
      <div className='Product-container'>
        <div className='image-container'>
          {isLoading && (
            <ClipLoader size={50} color={'#000'} loading={isLoading} />
          )}
          <img
            className={`image ${isLoading ? 'loading' : ''}`}
            loading='lazy'
            src={data.image_url}
            alt='img not available'
            onLoad={handleImageLoad}
          />
        </div>
        <div className='info-container'>
          <div className='info-name'>
            {data.name}
          </div>
          <div className='info-desc'>
            <p>
              {data.description.split(" ").slice(0, 20).join(" ")}...
            </p>
          </div>

          <div className='info-price'>
            {`₹ ${data.price}`}
          </div>

        </div>
      </div>
    </Link>
  )
}

export default ProductCard