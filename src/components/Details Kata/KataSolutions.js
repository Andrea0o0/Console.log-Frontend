import React, { useState,useEffect, useContext } from "react";
import { Controlled as ControlledEditor } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import solutionService from "../../services/solutionService";
import Loading from '../../assets/images/Logo/Loading.gif'
import { Link, useOutletContext } from "react-router-dom";
import YodaHappy from "../../assets/images/Yoda/Yoda happy.svg"
import { AuthContext } from "../../context/AuthContext";


export default function KataSolutions(){
    const { isLoggedIn } = useContext(AuthContext); 

    const {kata} = useOutletContext();
    const [solutions,setSolutions] = useState(undefined)
    const [ownsolution,setOwnSolution] = useState(undefined)
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(false);

    const getSolutions = async () => {
        try {
          const response = await solutionService.getSolutionsKata(kata._id);
          setSolutions(response);
          setLoading(false);
          setError(false);
        } catch (error) {
          setLoading(false);
          setError(true)
        }
      }

      const getownSolutions = async () => {
        try {
          const response = await solutionService.getSolutionsUser();
          response.true.length>0 ? setOwnSolution(true):setOwnSolution(false)
          setLoading(false);
          setError(false);
        } catch (error) {
          setLoading(false);
          setError(true)
        }
      }

      useEffect(() => {
        getownSolutions()
        getSolutions()
        // eslint-disable-next-line
      }, [])

    return(
        <>
            {isLoggedIn ?
            <>
            {loading && <div className='flex justify-center mt-20'><img width='10%' src={Loading} alt='loading'/></div>}
            {!loading && !ownsolution ? 
                <div className="flex justify-center my-4">
                    <Link to='/signup' className="flex flex-wrap w-3/4 justify-center p-3 pb-8 rounded-full bg-background-lightcolor hover:w-4/5 yoda">
                    <img width='20%' className="m-2" src={YodaHappy} alt='yoda happy'/>
                    <h3 className="w-4/5 text-center text-white font-normal">Sorry until you have a solution you don't have access to solutions.</h3>
                    </Link>
                </div>:
                <>
                {!loading && solutions && 
            <>
                {solutions.length > 0 ? 
                <>
                    {solutions.sort((a,b)=>a.updatedAt - b.updatedAt).reverse().map((elem,i) => {
                    return elem.user !== null &&
                    (<div key={i} className="m-4 flex flex-wrap justify-center">
                        <div className='kataSolutions w-11/12 flex flex-wrap justify-center'>
                            <div className="firstkataSolutions flex justify-center items-center text-white w-3/5">
                                <img className='rounded-lg' width='16%' src={elem.user.image} alt={`Image_${elem.user.username}`}/>
                                <h3 className="ml-4 text-sm bg-background-lightcolor p-1 px-20 rounded-full">{elem.user.username}</h3>
                            </div>
                            <ControlledEditor className="p-3 w-full secondkataSolutions" value={elem.function} options={{    lineWrapping:true, mode:'javascript', theme: 'material', readOnly:true}}/> 
                         </div>
                    </div>)}
                    )}
                </>:
                <>
                    <div className="flex justify-center my-4">
                        <Link to='/' className="flex flex-wrap w-3/4 justify-center p-3 pb-8 rounded-full bg-background-lightcolor hover:w-4/5 yoda">
                            <img width='20%' className="m-2" src={YodaHappy} alt='yoda happy'/>
                            <h3 className="w-4/5 text-center text-white font-normal">No solutions yet<br/>Be the First<br/>You must unlearn what you have learned</h3>
                        </Link>
                    </div>
                </> }
            </>}
                </>}
            </>:
            <div className="flex justify-center my-4">
                <Link to='/signup' className="flex flex-wrap w-3/4 justify-center p-3 pb-8 rounded-full bg-background-lightcolor hover:w-4/5 yoda">
                    <img width='20%' className="m-2" src={YodaHappy} alt='yoda happy'/>
                    <h3 className="w-4/5 text-center text-white font-normal">Sorry stranger you don't have access to the solutions<br/>Signup first</h3>
                </Link>
            </div>
            }
            {error && 
            <div className="flex justify-center text-white">
                <p className="text-center">Something went wrong. Couldn't find your kata and solutions</p>
            </div>} 
        </>)
}