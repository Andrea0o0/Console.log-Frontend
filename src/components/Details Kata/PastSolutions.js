import React, { useState } from "react";
import { useOutletContext } from 'react-router-dom';
import { Controlled as ControlledEditor } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'

export default function Solution(){
    const {solutions} = useOutletContext();

    return(
        <>
            {Object.keys(solutions).map((key,i) => 
            <div key={i} className={`${solutions[key].status ? 'solution_green':'solution_red'}`}>
                <ControlledEditor style={{padding:'3%'}} value={solutions[key].function} options={{    lineWrapping:true, mode:'javascript', theme: 'material', readOnly:true}}/> 
            </div>
            )} 
        </>
    )
}