import React,{useState,useEffect} from "react";
import { useParams,Link } from 'react-router-dom';
import Editor from '../components/Editor'
import useLocalStorage from "../hooks/useLocalStorage";
import Test from "../components/Test";
import kataService from "../services/kataService";

export default function KataLogic(){
    const {kataId} = useParams()
    // const initialState = {
    //     id: '',
    //     function: 'function input (array) {}'
    //   }

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [kata,setkata] = useState(null)
    const [initialState,setInitialState] = useState(null)

    const [js,setJs] = useState(initialState)
    const [srDoc,setSrcDoc] =useState('')


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

    const handleAddSolution = (newfunction) => {
        setJs(newfunction)
    }

    return (
        <>     
        {loading && <p>Loading...</p>}
      {!loading && kata && 
      <>   
      <Test input={js} 
        // input,setAddFunction,reset
        setAddSolution={handleAddSolution} reset={initialState}  setJs={handleReset} test_function={kata.input} output={kata.output}></Test> 
            <Editor language='javascript' displayName={kata.name} value={js} onChange={setJs}/>
            <iframe 
            title="output"
            sandbox="allow-scripts"
            frameBorder='0'
            width='100%'
            height='100%'
            />
      </>  
      }   
            
        </>
    )
}