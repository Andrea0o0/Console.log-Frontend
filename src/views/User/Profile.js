import React, { useEffect, useState, useContext } from 'react';
import { useParams,Link } from 'react-router-dom';
import authService from '../../services/authService';
import Loading from '../../assets/images/Logo/Loading.gif'
import { AuthContext } from '../../context/AuthContext';

export default function Profile() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [profile,setProfile] = useState([])

  const getUser = async () => {
    try {
      const response = await authService.user();
      setProfile(response[0])
      console.log(response)
    //   setExample(response.example)
    //   setInstructions(response.instructions.split("<ControlledEditor/>"))
      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [])

  return (
    <div className='m-4'>
    {loading && <div className='flex justify-center mt-20'><img width='10%' src={Loading} alt='loading'/></div>}
    {!loading && 
    <div>
      <img src={profile.image} alt='ImageProfile'/>
    </div>}
      {error && <p>Something went wrong. Couldn't find your kata</p>}
    </div>    
  )
}