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
        const res = await fetch('https://ecomprodb.onrender.com/login' , {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(LoginformData)
        });
        
         const data = await res.json();
        
        if (res.ok) {  // Check if the response was successful (e.g., status code 200)
            const token = data.token;  // Extract the token from the response
            localStorage.setItem('jwtoken', token);  // Store the token in localStorage
            console.log('Token stored in localStorage:', token);  // Confirm storage
        } else {
            // Handle errors like invalid login
            console.error('Login failed:', data.message || 'Unknown error');
        }
            
      

        if(res.status === 400 || !data){
            console.log("invalid credenials");
        }else if (res.status === 401){
            console.log("account linked with google");
        }else if(res.status === 200){
            
            dispatch({type:"USER" , payload:true})
            window.alert("Login successful");
            console.log("Login successful");
            navigate('/')
        }else{
            console.log('error')
        }
    }

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
