import React, { useState  , useEffect} from 'react'
import ProductCard from '../../components/productCard/ProductCard'
import { useParams } from 'react-router-dom';
import './productFiltered.css'
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";

const ProductsF = () => {
    const params = useParams();
    const { filter, id } = params; 
    const [Data , setData] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    console.log("hii")
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
          const filteredData = data.filter(item => item[filter] === id)
          setFilteredData(filteredData);
          }
          
      } catch (error) {
          console.error('Error fetching products:', error);
      }
      }

      fetchData();
  }, [])


  return (
    <div className='ProductsContainer'>
     {filteredData.map((data, index) => (
    <ProductCard key={index} data={data} />
  ))}
    </div>
  )
}

export default ProductsF
