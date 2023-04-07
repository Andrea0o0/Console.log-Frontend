import React, {useState,useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import red_seccion from '../assets/images/output/pipe-section-red.svg'
import green_seccion from '../assets/images/output/pipe-section-green.svg'
import { useOutletContext } from "react-router-dom";
// <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" style={{color: "#f31212",backgroundColor:"white",borderRadius:"50px"}}
// #67b04b green 

export default function Output(){
    const {output,kata} = useOutletContext();

    const [newOutput,setNewOutput] = useState(false)
    // const [newError,setNewError] = useState('')
    const [newValidation,setNewValidation] = useState(false)
    const [newError,setNewError] = useState(false)

    const [collapsible,setCollapsible] = useState({})


    const handleCollapsible = (id) => {
        let result = Object.assign({}, collapsible)
        result[id] ? result[id]=false:result[id]=true
        setCollapsible(result)
    }

    useEffect(() => {
    },[collapsible])

    const handleOutput = (output) => {
        setNewOutput(output)
    }

    const handleValidation = (validation) => {
        setNewValidation(validation)
    }

    const handleError = (error) => {
        setNewError(error)
    }

    const handleFirstCollapsible = () => {
        const firstCollapsible = {name:false}
        Object.keys(output.output).map((key,i) => {
            firstCollapsible[`should_${i}`] = false
            firstCollapsible[`log_${i}`] = false
        })
        setCollapsible(firstCollapsible)
    }
   
    useEffect(()=>{
        handleOutput(output.output)
        handleValidation(output.validation)
        handleError(output.error)   
        handleFirstCollapsible()     
        // setCollapsible()
    },[output])


    return (
        <>
        <div>
        </div>

        {/* Your results will be shown here. */}
        {Object.keys(newOutput).length > 0 || newError !== '' ? 
        <div className={`output ${newValidation === Object.keys(newOutput).length && newError === '' ? 'output_border_green':'output_border_red'}`}>
            <div className="outputpane">
                <p>Time: {output.random}</p>
                <p className={newValidation === Object.keys(newOutput).length && newError === '' ? 'output_green':''}>Passed: {newValidation} </p>
                <p className={newValidation !== Object.keys(newOutput).length || newError !== '' ? 'output_red':''}>Failed: {Object.keys(newOutput).length-newValidation + (newError === '' ? 0:1)} </p>
            </div>
            <hr/>
            <div className="output_results">
                <div>
                    <div className="flex_icon">
                        <img 
                        src={newValidation === Object.keys(newOutput).length && newError === '' ? green_seccion:red_seccion} style={{width:"10px"}} alt='red'/>
                        <p>Test Results:</p>
                    </div>
                    {newError > '' && <div className="result-type--error">{newError}</div>}
                </div>
                <div>
                    <div className="flex_icon" onClick={()=>handleCollapsible('name')}>
                        <FontAwesomeIcon className={newValidation === Object.keys(newOutput).length && newError === '' ? 'output_green':'output_red'} icon={`fa-solid fa-angle-${collapsible.name ? 'down':'right'}`} size="sm"/>
                        <p>{kata.name}</p>
                    </div>
                    {collapsible.name &&
                    <>
    {Object.keys(newOutput).map((key,i) =>
                    (<div key={i}>
                        <div>
                            <div>
                                <div>
                                    <div onClick={()=>handleCollapsible(`should_${i}`)} className="flex_icon">
                                        <FontAwesomeIcon className={JSON.stringify(newOutput[key].result[1]) === JSON.stringify(newOutput[key].return)  ? 'output_green':'output_red'} icon={`fa-solid fa-angle-${collapsible[`should_${i}`] ? 'down':'right'}`} size="sm"/>
                                        <p>{`Should return ${(typeof newOutput[key].result[1]) === 'object' ? JSON.stringify(newOutput[key].result[1]):newOutput[key].result[1] } for ${typeof newOutput[key].result[0] === 'object' ? JSON.stringify(newOutput[key].result[0]):newOutput[key].result[0]} `}</p>
                                    </div> 
                                    { collapsible[`should_${i}`] && 
                                    <>
                                    {newError === '' && JSON.stringify(newOutput[key].result[1]) === JSON.stringify(newOutput[key].return)  ? (<div className="flex_icon">
                                    <FontAwesomeIcon icon="fa-solid fa-circle-check" style={{color: "#67b04b",}} size="sm"/>
                                    <p className="output_green">Test Passed</p>
                                    </div> ):
                                    (<div className="flex_icon">
                                    <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" style={{color: "#c05c48"}} size="sm"/>
                                    <p>{`expected ${typeof newOutput[key].return === 'object' ? JSON.stringify(newOutput[key].return):newOutput[key].return} to equal ${typeof newOutput[key].result[1] === 'object' ? JSON.stringify(newOutput[key].result[1]):newOutput[key].result[1]}`}</p>
                                    </div> )}
                                    {newOutput[key].consoleslog.length > 0 && newError === '' &&
                                    <div>
                                        <div onClick={()=>handleCollapsible(`log_${i}`)}className="flex_icon">
                                            <FontAwesomeIcon icon={`fa-solid fa-angle-${collapsible[`log_${i}`] ? 'down':'right'}`} size="sm"/>
                                            <p>Logs</p>
                                        </div> 
                                        { collapsible[`log_${i}`] && 
                                        <>
                                            <div                 className="result-type--console">
                                                {newOutput[key].consoleslog.map((elem,i) => <p key={i}>{typeof elem === 'object' ? JSON.stringify(elem).split(',').map(elem=><p>{elem}</p>):elem}</p>)}
                                            </div>  
                                        </>}
                                        
                                    </div>}     
                                    </>}
                                </div>                           
                            </div>
                        </div>
                    </div>))}
                    </>}
                
                </div>
                {newValidation === Object.keys(newOutput).length && newError === '' && <div className="output_green output_congratulations">{`You have passed all of the tests! :)`}</div>}
            </div>
        </div>:
        <div className={`output_empty _output_${kata.level}`} style={{height:'42vh'}}>Your results will be shown here.</div>
        }
        </>
    )
}