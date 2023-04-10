import React,{useEffect,useState} from "react";
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import GitHub from '../../assets/images/GitHub-logo.png'
import authService from "../../services/authService";
import { useNavigate } from 'react-router-dom';

export default function Github () {
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useAuth(); 

  const [userData,setUserData] = useState(null)

  useEffect (() => {
    const queryString  = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const codeParam = urlParams.get("code")

    // async function getUserData(){
    //   await fetch(`${process.env.REACT_APP_BACKEND_URL}/getUserData`,{
    //     method:"GET",
    //     headers:{
    //       "Authorization":localStorage.getItem("accessToken") //BEARER TOKEN
    //     }
    //   }).then((response) => {
    //     return response.json()
    //   }).then((data) => {
    //     setUserData(data)
    //     handleUser(data)
    //   })
    // }

    if(codeParam && (localStorage.getItem("accessToken") === null)){
      const getAccessToken = async function (){
        const response = await authService.loginGitHub(codeParam)
        if (response.authToken) {
          storeToken(response.authToken);
          authenticateUser();
          navigate('/');
          toast.success('Welcome back!')
        } else {
          toast.error("Sorry we can't authenticate your Github user")
          navigate('/login')
        }
      //   await fetch(`${process.env.REACT_APP_BACKEND_URL}/getAccessToken?code=${codeParam}`,{
      //     method:"GET"
      //   }).then((response) => {
      //     return response.json()
      //   }).then((data) => {
      //     console.log(data)
      //     if(data.access_token){
      //       localStorage.setItem("accessToken",data.access_token)
      //       getUserData()
      //     }
      //   })
      }
      getAccessToken()

    }

},[])

console.log(userData)

const handleUser = async () => {
  console.log('user')
      try {
      const response = await authService.loginGitHub({username: userData.login,image:userData.avatar_url});
      console.log(response)
      navigate('/');
    } catch (error) {
      console.log(error)
    }
}

console.log(userData)
useEffect(() => {
  userData !== null && handleUser()
  // eslint-disable-next-line
},[userData])


function loginWithGithub() {
    window.location.assign(`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_GITHUB
  }`)
  }

      return(
        <>
        {/* {localStorage.getItem("accessToken") ? 
        <>
            <button onClick={()=>{localStorage.removeItem("accessToken"); setRerender(prev => !prev)}}>Log out with Github</button> 
            <h3>Get Data from GitHub</h3>
            <button onClick={getUserData}>Get Data</button>
            {Object.keys(userData).length !== 0 ?
            <>
              <h4>Hey there {userData.login}</h4>
              <img width="100px" height='100px' src={userData.avatar_url} alt='icon-user-github'></img>
              <a href={userData.html_url} style={{color:"white"}}>Link to the GitHub profile</a>
            </>:
            <>
            </>}
        </>
         :
        <button onClick={loginWithGithub}>Login with Github</button>  } */}
        <div>
          <img className="w-10 h-10 rounded-full mr-20" onClick={loginWithGithub} src={GitHub} alt="GitHub"/>
        </div>        
        {/* <button onClick={loginWithGithub}>Login with Github</button>  */}
        
        </>)

}