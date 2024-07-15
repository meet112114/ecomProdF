import React, { createContext , useReducer} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/homePage/homePage';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Profile from './pages/profile/profile';
import Logout from './pages/logout/logout';
import Googlelogin from './pages/googleLogin/googlelogin';
import { initialState , reducer } from "./reducer/UserReducer"
import Navbar from './components/navbar/navbar';
export const UserContext = createContext();


function App() {
  const [state, dispatch] = useReducer(reducer , initialState );

  return (
    <UserContext.Provider value={{state , dispatch}}>
    <Router>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<HomePage />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Signup/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/logout' element={<Logout/>} />
      <Route path='/google' element={<Googlelogin/>} />
    </Routes>
  </Router>
  </UserContext.Provider>
    
  );
}

export default App;
