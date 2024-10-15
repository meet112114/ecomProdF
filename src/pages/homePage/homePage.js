import React, { useEffect, useState } from 'react';
import "./homePage.css"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const HomePage = () => {
  useGSAP(()=>{
   

    // Animation for the text elements in the first page
    gsap.to(".text", {
      x: -100,
      opacity: 0,
      duration: 0.5,
      stagger: 0.4,
      scrollTrigger: {
        trigger: ".Left-section",
        start: "top ",
        toggleActions: "play none none reverse",
      }
    });

    // Animation for the text in the second page
    gsap.from(".text2", {
      x: -100,
      opacity: 0,
      duration: 0.7,
      stagger: 0.4,
       scrollTrigger: {
        
        
        trigger: "#page2 .Left-section",
        start: "top 70%",
        toggleActions: "play none none reverse",
      }
      })
      
      gsap.to("#rightsection1", {
        x: -100,
        opacity: 0,
        duration: 0.7,
        stagger: 0.4,
        scrollTrigger: {
          
          trigger: " #rightsection1",
          start:"top ",
          toggleActions: "play none none reverse",
        }
      })
   
      
      gsap.from("#rightsection2", {
        x: -100,
        opacity: 0,
        duration: 0.7,
        stagger: 0.4,
        scrollTrigger: {
          trigger: "#page2",
          start: "top center",
          toggleActions: "play none none reverse",
        }
      })
    });

   

  return (
    <div className='background-container'>

      <div className='page-1'>
        <div className='Left-section'>
          <div className='text'>
            Shop  BY Fabric
          </div>
        </div>
        <div id='rightsection1' className='right-section'>
          <div className='right-container cotton'>
            <div>Cotton</div>
          </div>
          <div className='right-container Nylon'>
          <div>Nylon</div>
          </div>
          <div className='right-container wool'>
          <div>Wool</div>
          </div>
          <div className='right-container others'>
          <div>Others</div>
          </div>
        </div>
      </div>


      <div id="page2" className='page-2'>
        <div className='Left-section'>
          <div id="text2" className='text2'>
            Shop  BY Neck
          </div>
        </div>
        <div   id="rightsection2" className='right-section'>
          <div className='right-container cotton'>
            <div>RoundNeck</div>
          </div>
          <div className='right-container Nylon'>
          <div>Vneck</div>
          </div>
          <div className='right-container wool'>
          <div>Colar</div>
          </div>
          <div className='right-container others'>
          <div>Others</div>
          </div>
        </div>
      </div>
    </div>
      
  )
}

export default HomePage