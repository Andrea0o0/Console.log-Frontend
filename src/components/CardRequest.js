import React, {useState,useEffect} from "react";

export default function CardRequestChampions({champions, initial_timer}){

    const initialMinute = Math.floor(initial_timer/60)
    const initialSeconds = initial_timer-(initialMinute*60);
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);

    useEffect(() => {
        ((minutes*60)+seconds) > 0  ? localStorage.setItem(`champions_${champions._id}`,(minutes*60)+seconds): localStorage.removeItem(`champions_${champions._id}`)
    },[minutes,seconds])

        
        useEffect(()=>{
        let myInterval = setInterval(() => {
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
        });


    return (
        <div className="text-white flex justify-center">
            <h3>Name Fight</h3>
            <h3>{champions.namefight}</h3>
            <h3>Status Champions</h3>
            <h3>Request</h3>
            <div>
                {champions.users_request.map(elem => {
                    return (
                        <div key={elem._id}>
                            <img width='10%' src={elem.image} alt={`image_${elem.username}`}/> 
                            <p>{elem.username}</p>
                            <p>{`Status: Pending`}</p>
                        </div>
                    )
                })}
                { minutes === 0 && seconds === 0
                ? null
                : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
            }
            </div>
            
        </div>
    )
}