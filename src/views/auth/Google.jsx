import React,{useEffect,useState} from "react";
import jwt_decode from "jwt-decode"

export default function Google(){

    const [user,setUser] = useState({})

    const handleSignOut = function (event){
        setUser({})
    }

    const handleCallbackResponse = async function(response){
        const userObject = await jwt_decode(response.credential)
        setUser(userObject)
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id:process.env.REACT_APP_GOOGLE,
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            {theme:"outline",size:"large"}
        )

    
        google.accounts.id.prompt()

    },[])
console.log(user)
    return (
        <>
            <div id="signInDiv"></div>
            {/* <button onClick={(e) => handleSignOut(e)}></button>
            { user && 
            <>
                <img src={user.picture} alt='imageGoogle'/>
                <h3>{user.name}</h3>
            </>} */}
            
        </>
    )
}