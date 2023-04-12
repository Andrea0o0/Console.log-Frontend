import React, { useEffect, useState } from 'react';
import { useParams,Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import Loading from '../../assets/images/Logo/Loading.gif'
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../../components/Avatar';

export default function Profile() {
  const { storeToken, authenticateUser } = useAuth(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [profile,setProfile] = useState([])
  const [changeAvatar,setChangeAvatar] = useState(false)
  const [newImage,setNewImage] = useState(undefined)
  const navigate = useNavigate();
  const [validValues, setValidValues] = useState(undefined)
  const [errorMessageUsername,setErrorMessageUsername] = useState('')
  const [newusername,setNewUsername] = useState('')
  const usernameRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  const getUser = async () => {
    try {
      const response = await authService.userInfo();
      setProfile(response)
      setNewImage(response.image)
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
      const response = await authService.editimage({image:image});
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

console.log(newImage)
const handleImgError = e => {
  e.target.src = profile.image
}

const handleChange = (e) => {
  setNewUsername(e.target.value)
  usernameRegex.test(e.target.value) ? setErrorMessageUsername(false):setErrorMessageUsername(true)
}


const inputStyle = "w-full rounded-full  border-2 shadow-xl p-3 ";
  const validStyle = "text-green-input border-green-input validInput ";
  const invalidStyle = "text-red-input border-red-input invalidInput ";

  return (
    <div className='profile m-4 flex flex-col items-center'>
    {loading && <div className='flex justify-center mt-20'><img width='10%' src={Loading} alt='loading'/></div>}
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
        <div className='avatar flex flex-col items-center text-white w-1/2 ml-2'>
          <p className='text-sm my-2'>Change username</p>
          <input className={`searchbar text-white text-center bg-background-lightcolor w-full ${inputStyle} ${errorMessageUsername === false ? validStyle : errorMessageUsername === true ? invalidStyle : ""}`} type="text" name="search"  placeholder={profile.username} onChange={handleChange}/>
        </div>

    </> 
      
        } 
      {error && <p>Something went wrong. Couldn't find your kata</p>}
    </div>
  )
}