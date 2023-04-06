import React, { useState,useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import { Controlled as ControlledEditor } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'

export default function Solution(){
    const {solutions} = useOutletContext();
    
    const [pastSolutions,setPastSolutions] = useState(solutions)

    return(
        <>
            {Object.keys(pastSolutions).map((key,i) => 
            <div key={i} className={`${pastSolutions[key].status ? 'solution_green':'solution_red'}`}>
                <ControlledEditor style={{padding:'3%'}} value={pastSolutions[key].function} options={{    lineWrapping:true, mode:'javascript', theme: 'material', readOnly:true}}/> 
            </div>
            )} 
        </>
    )
}