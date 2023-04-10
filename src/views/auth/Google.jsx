import React,{useEffect,useState} from "react";
import jwt_decode from "jwt-decode"
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import authService from "../../services/authService";

export default function Google(){
    const navigate = useNavigate();
  const { storeToken, authenticateUser } = useAuth(); 

    // const [user,setUser] = useState(null)

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
            toast.success('Welcome back!')
          } else {
            toast.error("Sorry we can't authenticate your Github user")
            navigate('/login')
          }

        //   AGNmyxZD50NsmRknuAYY8-h0dyB4SshW_7wAYuCBzj1Z=s96-c
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

        // type:"icon" size:"large", 

    
        google.accounts.id.prompt()

    },[])
    return (
        <>
            <div className='w-10' id="signInDiv"></div>
            
            {/* <button onClick={(e) => handleSignOut(e)}></button>
            { user && 
            <>
                <img src={user.picture} alt='imageGoogle'/>
                <h3>{user.name}</h3>
            </>} */}
            
        </>
    )
}