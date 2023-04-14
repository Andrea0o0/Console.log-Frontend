import React, { useState,useEffect } from "react";
import { Controlled as ControlledEditor } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import championsService from "../services/championsService";
import Loading from '../assets/images/Logo/Loading.gif'
import { useNavigate, Link, useOutletContext, NavLink } from "react-router-dom";
import YodaHappy from "../assets/images/Yoda/Yoda happy.svg"


export default function ChampionsView(){

    // const {kata} = useOutletContext();
    const [champions,setChampions] = useState(undefined)
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(false);

    const getChampions = async () => {
        try {
          const response = await championsService.getChampionsUser();
          console.log(response)
          setChampions(response);
          setLoading(false);
          setError(false);
        } catch (error) {
          setLoading(false);
          setError(true)
        }
      }

      useEffect(() => {
        getChampions()
        // eslint-disable-next-line
      }, [])

    return(
        <>
            {loading && <div className='flex justify-center mt-20'><img width='10%' src={Loading} alt='loading'/></div>}
            {!loading && 
            <>
                {champions.length > 0 ?
                <>
                    
                </>:
                <>
                    <div className="flex justify-center my-4">
                        <Link to='/profile/champions/new' className="flex flex-wrap w-3/4 justify-center p-3 pb-8 rounded-full bg-background-lightcolor hover:w-4/5 yoda">
                            <img width='20%' className="m-2" src={YodaHappy} alt='yoda happy'/>
                            <h3 className="w-4/5 text-center text-white font-normal">No Champions yet<br/>Create one<br/>Fear is the path to the dark side.<br/> Fear leads to anger.<br/> Anger leads to hate. Hate leads to suffering.</h3>
                        </Link>
                    </div>
                </>}
            </>}
            
            
            {error && <p>Something went wrong. Couldn't find your kata</p>}
        </>)
}