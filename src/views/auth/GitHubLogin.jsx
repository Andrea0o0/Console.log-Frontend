import React,{useEffect,useState} from "react";

export default function Github () {

    // eslint-disable-next-line
    const [rerender,setRerender] = useState(false)
    const [userData,setUserData] = useState({})

  useEffect (() => {
    const queryString  = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const codeParam = urlParams.get("code")
    console.log(codeParam)


    if(codeParam && (localStorage.getItem("accessToken") === null)){
      async function getAccessToken(){
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/getAccessToken?code=${codeParam}`,{
          method:"GET"
        }).then((response) => {
          return response.json()
        }).then((data) => {
          console.log(data)
          if(data.access_token){
            localStorage.setItem("accessToken",data.access_token)
            setRerender(prev => !prev)
          }
        })
      }
      getAccessToken()
    }

},[])


async function getUserData(){
  await fetch(`${process.env.REACT_APP_BACKEND_URL}/getUserData`,{
    method:"GET",
    headers:{
      "Authorization":localStorage.getItem("accessToken") //BEARER TOKEN
    }
  }).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data)
    setUserData(data)
  })
}

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
        <button onClick={loginWithGithub}>Login with Github</button> 
        
        </>)

}