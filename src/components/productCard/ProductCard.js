import React from 'react'
import './productCard.css'
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = ({data}) => {
  console.log(data)
  return (
    <Link
    to={{
      pathname: `/product/${data._id}`,
    }}
    className="ProductLink"
  >
    <div className='Product-container'>
        <div className='image-container'>
            <img className='image' src={data.image_url} alt='img not available'/>
        </div>
        <div className='info-container'>
            <div className='info-name'>
                {data.name}
            </div>
            <div className='info-desc'>
                <p>
                  {data.description} 
                </p>
            </div>
            <div className='info-price'>
                {`$ ${data.price}`}
            </div>
            
        </div>
    </div>
    </Link>
  )
}

export default ProductCard