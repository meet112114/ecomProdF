import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';

const SingleProduct = () => {

  const [productData , setProductData] = useState('');

  const params = useParams();
  const id = params.id;
  console.log(id)

  const getProjects = async () => {

    try{

      const res = await fetch(`/get/product/${id}` , {
          method: "GET",
          headers : {
             Accept : "application/json",
            'Content-Type':'applicaion/json'
          },
          credentials:"include"
      })

      const data = await res.json();
      setProductData(data);
        
      if (!res.status === 200){
        const error = new Error(res.error);
        throw error;  
      }

    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getProjects();
  }, [])

  return (
    <div>
        {productData.name}
    </div>
  )
}

export default SingleProduct
