import React , {useContext} from 'react'
import './navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../App'

const Navbar = () => {
  const  {state , dispatch} = useContext( UserContext);

  useGSAP(()=>{
    gsap.from(".nav-item" , {
      y: -100,
      opacity: 0,
      duration: 0.9,
      stagger: 0.4,
    });

    gsap.from("#abc", {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      delay: 0.5, // Delay the brand animation slightly
    });

  })

  const closeNavbar = () => {
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    if (navbarCollapse.classList.contains('show')) {
      // Collapse the navbar if it's open
      navbarCollapse.classList.remove('show');
    }
  };

  const RenderMenu = () => {
    if(state) {
      return(
        <>
          <li className="nav-item">
          <NavLink className="nav-link" onClick={closeNavbar} aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" onClick={closeNavbar} to="/products">Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" onClick={closeNavbar} to="/cart">Cart</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" onClick={closeNavbar} to="/profile">Profile</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" onClick={closeNavbar} to="/logout">Logout</NavLink>
        </li>
        </>
      )
    }else{
      return(
        <>
          <li className="nav-item">
          <NavLink className="nav-link" onClick={closeNavbar} aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" onClick={closeNavbar} to="/products">Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" onClick={closeNavbar} to="/Login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" onClick={closeNavbar} to="/register">Registartion</NavLink>
        </li>
        </>
      )
    }
  }


  return (
   <>
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" id="abc" href="#">Meet.$</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <RenderMenu />
            </ul>
          </div>
        </div>
      </nav>
   </>
  )
}

export default Navbar