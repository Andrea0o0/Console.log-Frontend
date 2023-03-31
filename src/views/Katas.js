import React,{useState,useEffect} from "react";
import Editor from '../components/Editor'
import useLocalStorage from "../hooks/useLocalStorage";
import Test from "../components/Test";

export default function Katas(){
    const initialState = {
        id: '',
        function: 'function input (array) {}'
      }

    const [functions,setFunctions] = useState([])
    const [js,setJs] = useLocalStorage('js',initialState.function)
    // const [js,setJs] = useState(initialState.function)
    const [srDoc,setSrcDoc] =useState('')

    const handleAddFunction = (newfunction) => {
        setJs(newfunction)
    }

    console.log(typeof js)

    return (
        <>       
            <Editor input={js} setAddFunction={handleAddFunction} reset={initialState.function} ></Editor>    
            <Test language='javascript' displayName='JS' value={js} onChange={setJs}/>
            {/* </div> */}
            <iframe 
            title="output"
            sandbox="allow-scripts"
            frameBorder='0'
            width='100%'
            height='100%'
            />
            
        </>
    )
}