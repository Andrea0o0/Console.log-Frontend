import React, { useState,useEffect } from "react";
import { Controlled as ControlledEditor } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import championsService from "../../services/championsService";
import Loading from '../../assets/images/Logo/Loading.gif'
import { Link } from "react-router-dom";
import YodaHappy from "../../assets/images/Yoda/Yoda happy.svg"
import Kata from "../../components/Details Kata/Kata";


export default function ChampionsView(){
    const [champions,setChampions] = useState(undefined)
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(false);

    const getChampions = async () => {
        try {
          const response = await championsService.getChampionsByStatus('FINISHED');
          response.length>0 && response.sort((a,b)=>a.updatedAt - b.updatedAt).reverse()
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
                <div className="flex flex-wrap justify-center w-full">
                {champions.map((elem,i) => 
                <div key={i}  className={`flex flex-wrap text-white justify-center py-6 my-2 bg-background-lightcolor w-4/5 tall:w-2/5 tall:flex tall:flex-col tall:items-center border-2 rounded-lg ${elem.kata.level === 5 ? 'border-color-5':elem.kata.level === 4 ? 'border-color-4':elem.kata.level === 3 ? 'border-color-3':elem.kata.level === 2 ? 'border-color-2':'border-color-1'}`}>
                  <h3 className="w-full text-center mb-2">{elem.namefight}</h3>             
                  <div className="flex flex-wrap w-full">
                      {elem.users.map(elem => {
                          return (
                              <div className="flex justify-center my-1 w-full items-center" key={elem._id}>
                                  <img width='8%' className="rounded-lg" src={elem.image} alt={`image_${elem.username}`}/> 
                                  <p className="w-1/3 px-3">{elem.username}</p>
                              </div>
                          )
                      })}
                  </div>
                  <div className="flex justify-center w-4/5"> 
                      <Kata championsProgress={true} kata={elem.kata}/>
                  </div>
                  <div className="flex flex-col justify-center mb-2 w-full items-center">
                      <p>Winner</p>
                    <div className='flex justify-center mb-2 w-full items-center'>
                    <img width='12%' className="rounded-lg" src={elem.winner.image} alt={`image_${elem.winner.username}`}/> 
                    <p className="w-1/3 px-3">{elem.winner.username}</p>
                    </div>
                  </div>
                  <div className={`border-1 rounded-lg ${elem.kata.level === 5 ? 'border-color-5':elem.kata.level === 4 ? 'border-color-4':elem.kata.level === 3 ? 'border-color-3':elem.kata.level === 2 ? 'border-color-2':'border-color-1'} w-4/5`}>
                            <ControlledEditor style={{padding:'3%'}} value={elem.function} options={{    lineWrapping:true, mode:'javascript', theme: 'material', readOnly:true}}/> 
                         </div>
                </div>
                )}
                </div>:
                <>
                    <div className="flex justify-center my-4">
                        <Link to='/profile/champions/new' className="flex flex-wrap w-3/4 justify-center p-3 pb-8 rounded-full bg-background-lightcolor hover:w-4/5 yoda">
                            <img width='20%' className="m-2" src={YodaHappy} alt='yoda happy'/>
                            <h3 className="w-4/5 text-center text-white font-normal">No Champions finished yet<br/>Create one<br/>Fear is the path to the dark side.<br/> Fear leads to anger.<br/> Anger leads to hate. Hate leads to suffering.</h3>
                        </Link>
                    </div>
                </>}
            </>}
            
            
            {error && <p>Something went wrong. Couldn't find your champions</p>}
        </>)
}