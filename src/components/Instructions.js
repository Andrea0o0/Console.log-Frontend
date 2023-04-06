import React from "react";
import { Controlled as ControlledEditor } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import { useOutletContext } from "react-router-dom";

export default function Instructions(){
    const {example,instructions,kata} = useOutletContext();

    return (
        <div className={`instructions_${kata.level}`}>
            <h4>DESCRIPTION:</h4>
            {instructions.map((elem,i) => {
                return (
                    <div  key={i}>
                        <div dangerouslySetInnerHTML={{__html: elem}}></div>
                        {i+1 !== instructions.length && <ControlledEditor value={example[i]} options={{    lineWrapping:true, mode:'javascript', theme: 'material', readOnly:true}}/>}
                    </div>
                )
            })}
        </div>
    )
}