import React, {useState,useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import red_seccion from '../assets/images/output/pipe-section-red.svg'
import green_seccion from '../assets/images/output/pipe-section-green.svg'
import { useOutletContext } from "react-router-dom";
// <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" style={{color: "#f31212",backgroundColor:"white",borderRadius:"50px"}}
// #67b04b green 

export default function Output(){
    const {output,name} = useOutletContext();

    const [newOutput,setNewOutput] = useState(false)
    // const [newError,setNewError] = useState('')
    const [newValidation,setNewValidation] = useState(false)
    const [newError,setNewError] = useState(false)

    const [collapsible,setCollapsible] = useState({})


    // const handleCollapsible = (id) => {
    //     setCollapsible(prev => {
    //         return {
    //             ...prev,
    //             [id]:collapsible[id] ? false:true
    //         }
    //     })
    // }

    const handleOutput = (output) => {
        setNewOutput(output)
    }

    const handleValidation = (validation) => {
        setNewValidation(validation)
    }

    const handleError = (error) => {
        setNewError(error)
    }

    useEffect(()=>{
        handleOutput(output.output)
        handleValidation(output.validation)
        handleError(output.error)        
        // setCollapsible()

    },[output])

    useEffect(()=>{
        handleOutput(output.output)
        handleValidation(output.validation)
        handleError(output.error)        
        // setCollapsible()

    },[])
    console.log(output)

    return (
        <>
        <div>
        {/* <img src={red_seccion} style={{width:"8px"}} alt='red'/>
         <FontAwesomeIcon className='output_red' icon="fa-solid fa-angle-down" />
         <FontAwesomeIcon icon="fa-solid fa-angle-right"/>
         <FontAwesomeIcon icon="fa-solid fa-circle-check" style={{color: "#67b04b",}}/>
         <FontAwesomeIcon icon="fa-solid fa-circle-xmark" style={{color: "#c05c48"}} />
         <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" style={{color: "#c05c48"}} /> */}
        </div>

        {/* Your results will be shown here. */}
        {Object.keys(newOutput).length > 0 && 
        <div className={`output ${newValidation === Object.keys(newOutput).length ? 'output_border_green':'output_border_red'}`}>
            <div className="outputpane">
                <p>Time: {Math.floor(Math.random()*400)+400}</p>
                <p className={newValidation === Object.keys(newOutput).length ? 'output_green':''}>Passed: {newValidation} </p>
                <p className={newValidation !== Object.keys(newOutput).length ? 'output_red':''}>Failed: {Object.keys(newOutput).length-newValidation} </p>
            </div>
            <hr/>
            <div className="output_results">
                <div>
                    <div className="flex_icon">
                        <img 
                        src={newValidation === Object.keys(newOutput).length ? green_seccion:red_seccion} style={{width:"10px"}} alt='red'/>
                        <p>Test Results:</p>
                    </div>
                    {newError > '' && <div className="result-type--error">{newError}</div>}
                </div>
                <div>
                    <div className="flex_icon">
                        <FontAwesomeIcon icon="fa-solid fa-angle-right" size="sm"/>
                        <p>{name}</p>
                    </div>
                    {Object.keys(newOutput).map((key,i) =>
                    (<div key={i}>
                        <div>
                            <div>
                                <div>
                                    <div className="flex_icon">
                                        <FontAwesomeIcon icon="fa-solid fa-angle-right" size="sm"/>
                                        <p>{`Should return ${newOutput[key].result[1]} for (${newOutput[key].result[0]}) `}</p>
                                    </div> 
                                    {newError === '' ? (<div className="flex_icon">
                                    <FontAwesomeIcon icon="fa-solid fa-circle-check" style={{color: "#67b04b",}} size="sm"/>
                                    <p className="output_green">Test Passed</p>
                                    </div> ):
                                    (<div className="flex_icon">
                                    <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" style={{color: "#c05c48"}} size="sm"/>
                                    <p>{`expected ${newOutput[key].return} to equal ${newOutput[key].result[1]}`}</p>
                                    </div> )}
                                    {newOutput[key].consoleslog.length > 0 && newError === '' &&
                                    <div>
                                        <div className="flex_icon">
                                            <FontAwesomeIcon icon="fa-solid fa-angle-right" size="sm"/>
                                            <p>Logs</p>
                                        </div> 
                                        <div 
                                        className="result-type--console">
                                            {newOutput[key].consoleslog.map((elem,i) => <p key={i}>{elem}</p>)}
                                        </div> 
                                    </div>}     
                                </div>                           
                            </div>
                        </div>
                    </div>))}
                </div>
                {newValidation === Object.keys(newOutput).length && <div className="output_green output_congratulations">{`You have passed all of the tests! :)`}</div>}
            </div>
        </div>
        }
        </>
    )
}