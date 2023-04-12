import React, { useEffect, useState } from 'react';
import { useParams,Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import Loading from '../../assets/images/Logo/Loading.gif'
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../../components/Avatar';

export default function User() {
  const { storeToken, authenticateUser } = useAuth(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [profile,setProfile] = useState([])
  const [changeAvatar,setChangeAvatar] = useState(false)
  const navigate = useNavigate();
  const [errorMessageUsername,setErrorMessageUsername] = useState('')
  const [newusername,setNewUsername] = useState('')
  const usernameRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  const getUser = async () => {
    try {
      const response = await authService.userInfo();
      setProfile(response)
      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true)
    }
  }

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [])

  const handleNewAvatar = async (image) => {
    try {
      setChangeAvatar(false)
      setLoading(true)
      const response = await authService.edituser({image:image});
      console.log(response)
      setProfile(response.user)
      setLoading(false);
      setError(false);
      if (response.authToken) {
        storeToken(response.authToken);
        authenticateUser();
        navigate('/profile');
        toast.success('Avatar changed!')
      } else {
        toast.error("Sorry We couldn't update your avatar ")
      }
    } catch (error) {
      setLoading(false);
      console.log(error)
    }    
  }

  const handleNewUsername = async () => {
    if(errorMessageUsername.state === false){
      try {
        setChangeAvatar(false)
        setLoading(true)
        const response = await authService.edituser({username:newusername});
        setProfile(response.user)
        setLoading(false);
        setError(false);
        if (response.authToken) {
          storeToken(response.authToken);
          authenticateUser();
          navigate('/profile');
          setErrorMessageUsername('')
          toast.success('Username changed!')
        } else {
          toast.error("Sorry We couldn't update your username")
          setErrorMessageUsername({state:'error',message:error})
        }
      } catch (error) {
        setLoading(false);
        console.log(error)
      }
    }    
  }


const handleImgError = e => {
  e.target.src = profile.image
}

const handleChange = (e) => {
  setNewUsername(e.target.value)
  usernameRegex.test(e.target.value) ? setErrorMessageUsername({state:false}):setErrorMessageUsername({state:true,message:"Enter a valid username of at least 8 characters"})
}


const inputStyle = "w-full rounded-full  border-2 shadow-xl p-1 px-3 ";
  const validStyle = "text-green-input border-green-input validInput ";
  const invalidStyle = "text-red-input border-red-input invalidInput ";

  return (
    <div className='profile m-4 flex flex-col items-center'>
    {loading && <div className='flex justify-center mt-20'><img width='35%' src={Loading} alt='loading'/></div>}
    {!loading &&
    <>
        {changeAvatar ? 
        <div className='avatar flex flex-col items-center text-white w-1/2'>
          <p className='text-sm mb-2'>Select New Avatar</p>
          <Avatar setNewImage={handleNewAvatar}/>
        </div>: 
        <div className='avatar flex flex-col items-center text-white w-1/2'>
          <p className='text-sm mb-2'>Current Profile Avatar</p>
          <img className='rounded-lg' width='85%' src={profile.image} onError={handleImgError} alt='ImageProfile'/>
          <button className='text-sm p-1.5 px-6 my-4 bg-background-lightcolor rounded-full border-1 border-background-lightcolor hover:border-white focus:border-white' onClick={() => setChangeAvatar(prev => !prev)}>Change Avatar</button>
        </div>}
        <div className='avatar flex flex-col items-center text-white w-3/4 ml-2'>
          <p className='text-sm my-2'>Change username</p>
          <input className={`searchbar text-center bg-background-lightcolor w-full ${inputStyle} ${errorMessageUsername.state === false ? validStyle : errorMessageUsername.state === true ? invalidStyle : ""}`} type="text" name="search"  placeholder={profile.username} onChange={handleChange}/>
          {errorMessageUsername.state === true && <p className='text-xs text-red-input text-center'>{errorMessageUsername.message}</p>}
          <button className={`text-sm p-1.5 px-6 my-4 bg-background-lightcolor rounded-full border-1 border-background-lightcolor hover:border-white hover:text-white ${errorMessageUsername.state === false ? 'text-green-input border-green-input' : errorMessageUsername.state === true ? 'text-red-input border-red-input' : ""}`} onClick={handleNewUsername}>Change Username</button>
          {errorMessageUsername.state === 'error' && <p className='text-xs text-red-input text-center'>{errorMessageUsername.message}</p>}
        </div>

    </> 
      
        } 
      {error && <p>Something went wrong. Couldn't find your kata</p>}
    </div>
  )
}