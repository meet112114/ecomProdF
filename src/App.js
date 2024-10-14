import React, { createContext, useEffect, useReducer } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import HomePage from './pages/homePage/homePage';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Profile from './pages/profile/profile';
import Logout from './pages/logout/logout';
import Products from './pages/products/products';
import SingleProduct from './pages/singleProduct/singleProduct';
import Order from './pages/orders/order';
import { initialState, reducer } from "./reducer/UserReducer";
import Navbar from './components/navbar/navbar';
import Cart from './pages/cart/cart';

export const UserContext = createContext();

// Create a separate component to handle the user verification logic
const AppWrapper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch('/auth/verify', {
          method: 'GET',
          credentials: 'include', // This ensures cookies are sent with the request
        });

        if (res.status === 200) {
          const data = await res.json();
          dispatch({ type: 'USER', payload: data.user }); // Assuming server sends user data
        } else {
          dispatch({ type: 'USER', payload: null }); // If not authenticated, set user to null
          navigate('/login'); // Redirect to login if not authenticated
        }
      } catch (error) {
        console.error('Error verifying user:', error);
        dispatch({ type: 'USER', payload: null });
      }
    };

    verifyUser();
  }, [dispatch, navigate]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<SingleProduct />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<Order />} />
      </Routes>
    </UserContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;