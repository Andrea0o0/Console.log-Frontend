import React, {useState,useEffect, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import Kata from "./Kata";
import championsService from "../services/championsService";
import { Link } from "react-router-dom";

export default function CardInProgress({champions,setStart}){
    const { user } = useContext(AuthContext); 

    const [valid,setValid] = useState({})


    return (
        <div className="championsRequest flex flex-wrap text-white justify-center py-6 my-2 bg-background-lightcolor rounded-full w-3/4">
        <h3 className="w-4/5 text-center mb-2">{champions.namefight}</h3>             
        <div className="flex flex-wrap w-4/5">
            {champions.users.map(elem => {
                return (
                    <div className="flex justify-center my-1 w-full items-center" key={elem._id}>
                        <img width='15%' className="rounded-lg" src={elem.image} alt={`image_${elem.username}`}/> 
                        <p className="w-1/3 px-3">{elem.username}</p>
                    </div>
                )
            })}
        </div>
        <div className="flex justify-center w-4/5"> 
            <Kata championsProgress={true} kata={champions.kata}/>
        </div>
        <div>
        <Link to={`/katas/champions/${champions.kata._id}/${champions._id}`}><button className={`text-sm p-1.5 px-6 my-2 mt-5 bg-background-lightcolor rounded-full border-1 border-background-lightcolor border-white focus:border-white`} type="sumbit">Start Champions</button></Link>
        </div>
        </div>
        
    )
}