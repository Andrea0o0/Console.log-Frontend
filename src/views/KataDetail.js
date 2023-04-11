import React, { useEffect, useState, useContext } from 'react';
import { useParams,Link } from 'react-router-dom';
import kataService from '../services/kataService';
import { Controlled as ControlledEditor } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import Kata from '../components/Kata';
import Loading from '../assets/images/Logo/Loading.gif'
import { AuthContext } from '../context/AuthContext';

export default function KataDetail() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 
  const { kataId } = useParams();
  const [kata, setkata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [instructions,setInstructions] = useState('')
  const [example,setExample] = useState('')

  const getKata = async () => {
    try {
      const response = await kataService.getOneKata(kataId);
      setkata(response);
      setExample(response.example)
      setInstructions(response.instructions.split("<ControlledEditor/>"))
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error(error)
      setLoading(false);
    }
  }

  useEffect(() => {
    getKata();
    // eslint-disable-next-line
  }, [kataId])

  return (
    <div className='m-4'>
      {loading && <div className='flex justify-center mt-20'><img width='10%' src={Loading} alt='loading'/></div>}
      {!loading && kata && 
      <>
        <Kata kata={kata} practise={true}/>
        <div className={`instructions instructions_${kata.level}`} style={{height:'100%'}}>
        <h4>DESCRIPTION:</h4>
        {instructions.length > 0 && instructions.map((elem,i) => {
          return (
            <div  key={i}>
              <div dangerouslySetInnerHTML={{__html: elem}}></div>
              {i+1 !== instructions.length && <ControlledEditor value={example[i]} options={{    lineWrapping:true, mode:'javascript', theme: 'material', readOnly:true}}/>}
            </div>
            )
        })}
        {isLoggedIn ? <button className="start_btn"><Link to={`/kata/practise/${kata._id}`}>Start</Link></button>:<button className="start_btn"><Link to={`/signup`}>Sign up FIRST! 😉</Link></button>}
      </div>
      </>}
        {error && <p>Something went wrong. Couldn't find your kata</p>}
      </div>       
  )
}