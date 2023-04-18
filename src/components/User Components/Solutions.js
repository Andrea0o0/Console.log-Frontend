import React, { useState,useEffect } from "react";
import { Controlled as ControlledEditor } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import solutionService from "../../services/solutionService";
import Loading from '../../assets/images/Logo/Loading.gif'
import { Link } from "react-router-dom";
import Kata from "../Details Kata/Kata";
import YodaPatience from "../../assets/images/Yoda/Yoda patience.svg"

export default function Solutions(){
    
    const [solutions,setSolutions] = useState(undefined)
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(false);

    const getSolutions = async () => {
        try {
          const response = await solutionService.getSolutionsUser();
          setSolutions(response);
          setLoading(false);
          setError(false);
        } catch (error) {
          setLoading(false);
          setError(true)
        }
      }

      useEffect(() => {
        getSolutions()
        // eslint-disable-next-line
      }, [])

    return(
        <>
            {loading && <div className='flex justify-center mt-20'><img width='10%' src={Loading} alt='loading'/></div>}
            {!loading && solutions && 
            <>
                {solutions.true.length > 0 ? 
                <div className="flex justify-center flex-wrap">
                    {solutions.true.map((elem,i) => 
                    <div key={i} className="mx-4 tall:w-3/5 flex justify-center flex-wrap mb-4">
                        <div className="w-4/5">
                            <Kata solutions={true} kata={elem.kata}/>
                        </div>
                        <div className={`w-4/5 border-1 rounded-lg ${elem.kata.level === 5 ? 'border-color-5':elem.kata.level === 4 ? 'border-color-4':elem.kata.level === 3 ? 'border-color-3':elem.kata.level === 2 ? 'border-color-2':'border-color-1'}`}>
                            <ControlledEditor style={{padding:'3%'}} value={elem.function} options={{    lineWrapping:true, mode:'javascript', theme: 'material', readOnly:true}}/> 
                         </div>
                    </div>)}
                </div>:
                <>
                    <div className="flex justify-center my-4">
                        <Link to='/' className="flex flex-wrap w-3/4 justify-center p-3 pb-8 rounded-full bg-background-lightcolor hover:w-4/5 yoda">
                            <img width='20%' className="m-2" src={YodaPatience} alt='yoda happy'/>
                            <h3 className="w-4/5 text-center text-white text-normal">You still have no solution <br/> Patience you must have my young padawan</h3>
                        </Link>
                    </div>
                </> }
            </>}
        {error && 
            <div className="flex justify-center text-white">
                <p className="text-center">Something went wrong. Couldn't find your kata</p>
            </div>}     
        </>)
}