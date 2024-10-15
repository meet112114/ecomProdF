import React , {  useContext} from 'react'
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Googlelogin = () => {
    const  {state , dispatch} = useContext( UserContext);
    const navigate = useNavigate();
    dispatch({type:"USER" , payload:true})        
    navigate('/')
  return (
    <div>Googlelogin</div>
  )
}

export default Googlelogin