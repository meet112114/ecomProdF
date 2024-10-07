import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const HomePage = () => {

  const [profileFormData, setProfileformData] = useState('');
  const [programData, setProgramData] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/get/profile', {
          method: 'GET',
          credentials: 'include', // Important for sending cookies
        });

        if (res.status === 200) {
          const data = await res.json();
          setProfileformData(data);
          console.log(data.program)
          await fetchData(data.program);
        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  async function fetchData(programs) {
    try {
      const results = await Promise.all(programs.map(async (program) => {
        const response = await fetch(`/${program.ProgramId}/getprogram` , {
          method: 'GET',
          credentials: 'include', // Important for sending cookies
        });
        
        if (!response.ok) {
          console.warn(`No program found for id ${program.ProgramId}`);
          return null;
        }

        const data = await response.json();
        if (data.programType !== 'GYM') {
          return null;
        }
        return data;
      }));
      const validResults = results.filter(result => result !== null);
      setProgramData(validResults);

      console.log(validResults); 

    } catch (error) {
      console.error('Error fetching program data:', error);
    }
  }

  return (
    <div> 
      
      { programData.map((programData , index ) => {
        

      return (
         <Link
       to={{
         pathname: `/program/${programData._id}`,
       }}
       Key={index}
     >
      
     <button className='project-tab'>
        
        <div className='project-type'>
          Program Name : {programData.programName}
        </div>
        <div className='project-type'>
          program Type : {programData.programType}
        </div>
       
     </button>
     </Link>
     )
    }
  )
  }
    
      
    </div>
  )
}

export default HomePage