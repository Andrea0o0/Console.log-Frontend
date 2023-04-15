import React,{useEffect,useState} from "react";
import jwt_decode from "jwt-decode"
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import authService from "../../services/authService";

export default function Google(){
    const navigate = useNavigate();
  const { storeToken, authenticateUser } = useAuth(); 

    const handleCallbackResponse = async function(response){
        const userObject = await jwt_decode(response.credential)
        handleUser(userObject)
    }

    const handleUser = async function (user){
        const response = await authService.loginGoogle({username:user.name.replaceAll(' ',''),email:user.email,image:user.picture})
        if (response.authToken) {
            storeToken(response.authToken);
            authenticateUser();
            navigate('/');
            toast.success('Welcome back!',{style:{backgroundColor:'#1a1e24', color:'white'}})
          } else {
            toast.error("Sorry we can't authenticate your Github user",{style:{backgroundColor:'#1a1e24', color:'white'}})
            navigate('/login')
          }
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id:process.env.REACT_APP_GOOGLE,
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            {type:"icon",theme:"outline",shape:"pill"}
        )

        google.accounts.id.prompt()

    },[])
    
    return (
        <>
            <div className='w-10' id="signInDiv"></div>
        </>
    )
}