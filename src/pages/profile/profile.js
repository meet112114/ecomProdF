import React , { useState  , useEffect}from 'react'
import './profile.css'
const Profile = () => {
    const [profileFormData, setProfileformData] = useState({ name: '', gender: '' , height: '', weight: '', age: '' });
    

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const res = await fetch('/get/profile', {
            method: 'GET',
            credentials: 'include', // Important for sending cookies
          });
  
          if (res.status === 200) {
            const data = await res.json();
            console.log(data)
            console.log(data)
            setProfileformData(prevState => ({
              ...prevState,
              ...data
            }));
          } else {
            console.error('Failed to fetch profile');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };
  
      fetchProfile();
  
    }, []);


    const handleChange = (e) => {
      const { name, value } = e.target;
      setProfileformData({
        ...profileFormData,
        [name]: value,
      });
      }
  
      const ProfileSubmit = async (e) => {
          e.preventDefault();
          const res = await fetch('/create/profile' , {
              method:"POST",
              headers:{
                  "Content-Type" : "application/json"
              },
              body: JSON.stringify(profileFormData)
          });
          
          const data = res.json();
          console.log(data)
  
          if(res.status === 400 || !data){
              console.log("invalid credenials");
          }else if (res.status === 401){
              console.log("account linked with google");
          }else {
              window.alert("profile Updated");
              
          }
      }
  
    return (
      <>
      <div className='main-frame'>
          <div className='Title'>Profile</div>
         
              <form className='profile-form' onSubmit={ProfileSubmit}>
                  <div className='form-group'>
                      <label htmlFor="name">Name</label>
                      <input className='inputs1' type="text" name="name" id="name" placeholder="Name" value={profileFormData.name} onChange={handleChange} />
                  </div>
                  <div className='form-group'>
                    <label htmlFor="gender">Gender</label>
                    <select className='inputs1 custom-select' name="gender" id="gender" value={profileFormData.gender} onChange={handleChange}>
                      <option value="" disabled>Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    <option value="other">Other</option>
                    </select>
                  </div>
                  <div className='form-group'>
                      <label htmlFor="height">Height</label>
                      <input className='inputs1' type="number" name="height" id="height" placeholder="Height" value={profileFormData.height} onChange={handleChange} />
                  </div>
                  <div className='form-group'>
                      <label htmlFor="weight">Weight</label>
                      <input className='inputs1' type="number" name="weight" id="weight" placeholder="Weight" value={profileFormData.weight} onChange={handleChange} />
                  </div>
                  <div className='form-group'>
                      <label htmlFor="age">Age</label>
                      <input className='inputs1' type="number" name="age" id="age" placeholder="Age" value={profileFormData.age} onChange={handleChange} />
                  </div>
                  <div className="submit-button">
                      <button className='btn1' type="submit">Save Profile</button>
                  </div>
              </form>
      </div>
  </>
      
    )
}

export default Profile