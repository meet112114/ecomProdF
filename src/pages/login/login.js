import React , { useState , useContext} from 'react'
import GoogleIcon from "../../assets/images/google-icon.png"
import { UserContext } from '../../App';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [LoginformData, setLoginformData] = useState({ email: '', password: '' });
  const  {state , dispatch} = useContext( UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginformData({
      ...LoginformData,
      [name]: value,
    });
    }

    const LoginSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const res = await fetch('https://ecomprodb.onrender.com/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(LoginformData) // Ensure LoginformData contains email and password
        });
        
        // Handle specific status codes before parsing JSON
        if (res.status === 400) {
            console.log("Invalid credentials");
            window.alert("Invalid credentials");
            return;
        } else if (res.status === 401) {
            console.log("Account linked with Google");
            window.alert("Account linked with Google");
            return;
        }
        
        // If response is OK (status 200-299), process it
        if (res.ok) {
            const data = await res.json(); // Parse JSON
            const token = data.token; // Extract token
            
            localStorage.setItem('jwtoken', token);  // Store token in localStorage
            console.log('Token stored in localStorage:', token);
            
            // Dispatch user authentication state
            dispatch({ type: "USER", payload: true });
            window.alert("Login successful");
            console.log("Login successful");
            
            navigate('/');  // Redirect to homepage or any other route
        } else {
            // Handle other unsuccessful status codes
            console.error('Login failed with status:', res.status);
            window.alert("Login failed");
        }
        
    } catch (error) {
        // Handle any network or unexpected errors
        console.error('Request failed:', error);
        window.alert("An error occurred during login");
    }
};
  
  return (
    <>
    <div className='Main-frame'>
    <div className='title'>Login </div>
            <div className='login'>
                <input className='inputs' type="text" name="email" id="email" placeholder="email" value={LoginformData.email} onChange={handleChange} />
                <input className='inputs' type="password" name="password" id="password" placeholder="Password" value={LoginformData.password} onChange={handleChange}  />
                <div className="log">
                    <input className='log-button' type="submit" name="signin" value="Log in" onClick={LoginSubmit} />
                </div>
            </div>

           <div className='google-login'>
                <a className='google-link' href= "https://ecomprodb.onrender.com/auth/google/callback">
                    <div className='google-button'>
                        
                        <img
                            className="google-img"
                            src={GoogleIcon}
                            alt=""
                        />
                        <div className='google-text'>Sign In With Google</div>
                    </div>
                </a>
            </div>

                              
            <a className='a-link' href="/register">I am not a member</a>
        </div>
    </>
    
  )
}

export default Login
