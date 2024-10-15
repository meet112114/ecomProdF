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
import Googlelogin from './pages/GoogleLogin/googleLogin';
import { initialState, reducer } from "./reducer/UserReducer";
import Navbar from './components/navbar/navbar';
import Cart from './pages/cart/cart';

export const UserContext = createContext();


function App() {
  const [state, dispatch] = useReducer(reducer , initialState );

  return (
    <UserContext.Provider value={{state , dispatch}}>
    <Router>
    <Navbar/>
    <Routes>
      
<Route exact path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/products' element={<Products />} />
        <Route path='/google' element={<Googlelogin />} />
        <Route path='/product/:id' element={<SingleProduct />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<Order />} />
    </Routes>
  </Router>
  </UserContext.Provider>
    
  );
}


export default App;
