import React,{useEffect, useState} from "react";
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import solutionService from "../services/solutionService";


export default function Editor({ displayName,value,onChange,level,NewSolution}){

    const [open,setOpen] = useState(true)
    const [selected,setSelected] = useState('')
    const [key,setKey] = useState('')
    const [hover,setHover] = useState(false)
    const [save,setSave] = useState(false)
    console.log(save===true)

    const handleChange = (editor,data,value) => {
        onChange(value)
    }

    const handleSelect = (event,cursor) => {
        setSelected({
            head:cursor.ranges[0].head.line,
            tail:cursor.ranges[0].anchor.line})
    }

    const handleKey = (key) => setKey(prev => key === "ControlLeft" ? key:prev === "ControlLeft" && key === "Backslash" ? [prev,key]:'' )
  
    const handleKeyPress = (n,event) => {
        handleKey(event.code)
    }
    
    const handleComment = () => {
        let lines = value.split(/[\n\r]+/)
        let newvalue = ''
        lines.forEach((elem,i) => newvalue += i>=selected.head && i<=selected.tail ? elem.includes('//') ? i===lines.length-1 ? `${elem.replaceAll('//','')}`: `${elem.replaceAll('//','')}\n`: i===lines.length-1 ? `// ${elem}`:`// ${elem}\n`: i===lines.length-1 ? `${elem}`:`${elem}\n`)
        onChange(newvalue)
    }

    useEffect(() => {
        key.length === 2 && handleComment()
    },[key])
    
    const handleHover = () => {
        setHover(prev => !prev)
    }

    return (
        <>
            <div className="pane top-pane">
                <div className={` editor-container ${open ? '':'collapsed'}`}>
                    <div className={`  editor-title ${hover ? `hover_${level}`:`_${level}`}`} onMouseEnter={handleHover}
    onMouseLeave={handleHover}>
                    <p>{displayName}</p>
                    <button onClick={() => setSave(true)}><p>Click to Save function</p></button>
                    </div>
                    <ControlledEditor
                    onBeforeChange={handleChange}
                    onSelection={handleSelect}
                    onKeyUp={handleKeyPress}
                    value={value}
                    className='code-mirror-wrapper'
                    options={{
                        lineWrapping:true,
                        lint:true,
                        mode:'javascript',
                        theme: 'material',
                        lineNumbers:true
                    }}
                    />
                </div>
            </div>
        </>
    )
}