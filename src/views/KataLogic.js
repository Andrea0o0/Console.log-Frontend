import React,{useState,useEffect} from "react";
import { useParams,NavLink, Outlet } from 'react-router-dom';
import Editor from '../components/Editor'
import useLocalStorage from "../hooks/useLocalStorage";
import Test from "../components/Test";
import kataService from "../services/kataService";
import Kata from "../components/Kata";
import Output from "../components/Output";

export default function KataLogic(){
    const {kataId} = useParams()

    const initialOutput = {
      output:{},
      error:'',
      validation:0,
    }
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [kata,setkata] = useState(null)
    const [initialState,setInitialState] = useState(null)
    const [output,setOutput] = useState(initialOutput)
    // const [outputToggle,setOutputToggle] = useState(true)

    const [js,setJs] = useState(initialState)

    const getKata = async () => {
        try {
          const response = await kataService.getOneKata(kataId);
          setkata(response);
          setJs(response.initialValue)
          setInitialState(response.initialValue)
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

    const handleReset = () => {
      setJs(initialState)
    }

    const handleAddSolution = (newfunction,completed) => {
        setJs(newfunction)
    }

    const handleOutput = (newoutput) => {
      setOutput(newoutput)
    }

    return (
        <>     
        {loading && <p>Loading...</p>}
      {!loading && kata && 
      <>   
      <div>
      <Kata kata={kata}/>
        <ul>
          <li><NavLink to={`/kata/practise/${kata._id}/output`}>Output</NavLink></li>
          {/* <li onClick={()=>setOutputToggle(prev => !prev)}>Output</li> */}
          <li><NavLink to={`/kata/practise/${kata._id}/instructions`}>Instructions</NavLink></li>
          <li><NavLink to={`/kata/practise/${kata._id}/pastsolutions`}>Past Solutions</NavLink></li>
        </ul>
        {/* {outputToggle && <Output name={kata.name} output={output}/>} */}
        <Outlet context={{example:kata.example,instructions:kata.instructions.split("<ControlledEditor/>"),output:output,name:kata.name}} />
      </div>
      <div> 
        <Editor language='javascript' displayName={`Solution => ${kata.name}`} value={js} onChange={setJs} level={kata.level}/>
        <Test input={js} 
        setAddSolution={handleAddSolution} reset={initialState}  setJs={handleReset} test_function={kata.input} output={kata.output} kata={kata} setOutput={handleOutput} initialOutput={initialOutput}></Test>
      </div>
        
      </>  
      }   
            
        </>
    )
}