import React, {useState,useEffect, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import championsService from "../services/championsService";
import { useAuth } from "../hooks/useAuth";

export default function IntervalChampions({champions, initial_timer,setStatusUser}){
    const { user } = useContext(AuthContext); 
    const { storeToken, authenticateUser, isLoggedIn } = useAuth(); 

    const initialMinute = Math.floor(initial_timer/60)
    const initialSeconds = initial_timer-(initialMinute*60);
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);


    const handleEditTimer = async function(){
        try {
            console.log(minutes,seconds)
            const response = await championsService.editTimeRequest(champions._id,{time:((minutes*60)+seconds)})
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleStart = async function(){
        console.log('start')
    }

    useEffect(() => {
        console.log(user)
        user._id === champions.users[0] && ((minutes*60)+seconds) > 0  && handleEditTimer() 
        user._id === champions.users[0] && ((minutes*60)+seconds) < 1 && handleStart()
        
    },[minutes,seconds])

        
        useEffect(()=>{
            authenticateUser()
            if(user._id === champions.users[0]){
              const myInterval = setInterval(() => {
                console.log('in')
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(myInterval)
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } 
            }, 1000)
            return ()=> {
                clearInterval(myInterval);
              };  
            }
        });

    return ( <>Hello</>      
    )
}