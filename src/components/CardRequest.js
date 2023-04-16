import React, {useState,useEffect, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import Kata from "./Kata";


export default function CardRequestChampions({champions, initial_timer,setStatusUser}){
    const { user } = useContext(AuthContext); 

    const [ minutes, setMinutes ] = useState(undefined);
    const [seconds, setSeconds ] =  useState(undefined);

    useEffect(() => {
        setMinutes(Math.floor(initial_timer/60))
        setSeconds(initial_timer-((Math.floor(initial_timer/60))*60))
    },[champions])

    return (
        <div className="championsRequest flex flex-wrap text-white justify-center py-6 my-2 bg-background-lightcolor rounded-full w-4/5">
        <h3 className="w-4/5 text-center mb-2">{champions.namefight}</h3>             
        <div className="flex flex-wrap w-3/4">
            {champions.users_request.map(elem => {
                return (
                    <div className="flex justify-center my-1 w-full items-center" key={elem._id}>
                        <img width='10%' className="rounded-lg" src={elem.image} alt={`image_${elem.username}`}/> 
                        <p className="w-2/3 px-3">{elem.username}</p>
                        {elem.username===user.username && !champions.users.includes(elem._id) ?
                        <button name={elem._id} className="w-20 text-center border-1 rounded-full border-green-input text-green-input" onClick={()=>setStatusUser(champions._id)}>Accept</button>: champions.users.includes(elem._id) ? <p className="w-20 text-center text-green-input">Accepted</p>:<p className="w-20 text-center">{`Pending`}</p>}
                    </div>
                )
            })}
        </div>
        <div className="flex justify-center w-4/5"> 
            <Kata champions={true} kata={champions.kata}/>
        </div>
        <div className="w-4/5 flex justify-center my-2">
        <p>Time Remaining: { minutes === 0 && seconds === 0
            ? null : `${minutes}:${seconds < 10 ?  `0${seconds}` : seconds}`
        }  </p>
          
        </div>
        </div>
        
    )
}