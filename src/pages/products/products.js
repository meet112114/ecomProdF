import React, { useState  , useEffect} from 'react'
import ProductCard from '../../components/productCard/ProductCard'
import './products.css'
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";

const Products = () => {
  const [Data , setData] = useState([])

  useGSAP(()=>{
    gsap.from(".ProductsContainer" , {
      x: -100,
      opacity: 0,
      duration: 0.7,
      stagger: 0.2,
    });

  })
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://ecomprodb.onrender.com/get/products');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }else{
            const data = await response.json();
          setData(data); 
          }
          
      } catch (error) {
          console.error('Error fetching products:', error);
      }
      }

      fetchData();
  }, [])

  console.log(Data)

  return (
    <div className='ProductsContainer'>
     {Data.map((data, index) => (
    <ProductCard key={index} data={data} />
  ))}
    </div>
  )
}

export default Products