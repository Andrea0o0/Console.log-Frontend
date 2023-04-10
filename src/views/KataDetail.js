import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import kataService from '../services/kataService';
import { Controlled as ControlledEditor } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import Kata from '../components/Kata';

export default function KataDetail() {
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
      {loading && <p>Loading...</p>}
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
        <button className="start_btn" style={{ marginLeft: '10px' }}><Link to={`/kata/practise/${kata._id}`}>Start</Link></button>
      </div>
      </>}
        {error && <p>Something went wrong. Couldn't find your kata</p>}
      </div>       
  )
}