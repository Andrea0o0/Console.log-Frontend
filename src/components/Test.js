import React,{useEffect, useState} from "react";
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import { Controlled as ControlledEditor } from 'react-codemirror2'


export default function Test({ displayName,value,onChange }){

    const [open,setOpen] = useState(true)
    const [selected,setSelected] = useState('')
    const [key,setKey] = useState('')
    // const [input,setInput] = useState(value)

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
    

    return (
        <>
            <div className="pane top-pane">
                <div className={`editor-container ${open ? '':'collapsed'}`}>
                    <div className="editor-title">
                    {displayName}
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