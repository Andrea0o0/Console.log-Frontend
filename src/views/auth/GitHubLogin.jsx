import React,{useEffect,} from "react";
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import GitHub from '../../assets/images/GitHub-logo.png'
import authService from "../../services/authService";
import { useNavigate } from 'react-router-dom';

export default function Github () {
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useAuth(); 


  useEffect (() => {
    const queryString  = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const codeParam = urlParams.get("code")

    if(codeParam && (localStorage.getItem("accessToken") === null)){
      const getAccessToken = async function (){
        const response = await authService.loginGitHub(codeParam)
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
      getAccessToken()

    }

},[])


function loginWithGithub() {
    window.location.assign(`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_GITHUB
  }`)
  }

      return(
        <>
        <div className="cursor-pointer">
          <img className="w-10 h-10 rounded-full mr-20" onClick={loginWithGithub} src={GitHub} alt="GitHub"/>
        </div>                
        </>)

}