import React, { useState, useEffect } from 'react'

export default function Test({ input,setAddSolution,setJs,test_function,output,setOutput,initialOutput}) { 

  const [newfunction, setNewFunction] = useState(input);
  const [newoutput,setNewOutput] = useState(initialOutput)
  const [validation,setValidation] = useState(0)

useEffect(()=> {
  setNewFunction(input)
  },[input])

  const handleOutput = (output,name,response) => {
    console.log(output,name,response)
    let result = Object.assign({}, newoutput)
    output === 0 ? result[name] = response:
    name === 'result' ? result.output[output] = {[name]:response}:
    result.output[output][name] = response 
    setNewOutput(result)
    
  }

  useEffect(()=> {
    handleOutput(0,'validation',validation)
    },[validation])
  

  useEffect(()=> {
    // console.log(newoutput)
    setOutput(newoutput)
    },[newoutput])

  const handleResetOutput = () => {
    handleOutput(0,'error','newerror')
    setNewOutput(initialOutput)
    setValidation(0)
  }

  const handleTestInput = (e) => {
    e.preventDefault()
    handleResetOutput()
    const outputValidation = e.nativeEvent.submitter.name === 'Run' ? ([...output].slice(0,3)): [...output]
    try {
      outputValidation.map((elem,i) => {
      const callfunction = test_function.split('${input}')
      const input = elem[0]
      const function_input = `${newfunction} ${callfunction[0]}${input}${callfunction[1]}`
      const response = eval(function_input)
      let consolesfunction = ''
      if(function_input.includes('return')){
        const toconsoles = function_input.replaceAll('console.log','consoles.push').split('return')[0]
      consolesfunction = eval(`let consoles = []
      ${toconsoles} return consoles} ${callfunction[0]}${input}${callfunction[1]}`)
      }
      handleOutput(`output_${i+1}`,'result',elem)
      handleOutput(`output_${i+1}`,'return',response)
      consolesfunction !== undefined && consolesfunction.length > 0  ? handleOutput(`output_${i+1}`,'consoleslog',consolesfunction): handleOutput(`output_${i+1}`,'consoleslog','')
      response === elem[1] && setValidation(prev => prev + 1)
      response === undefined && handleOutput(0,'error',`ReferenceError: undefined try again`)
    })
    } catch (error) {
      handleOutput(0,'error',`ReferenceError: ${error.message}`)
    }
    finally{
      outputValidation.length === Object.keys(newoutput.output).length && e.nativeEvent.submitter.name ==='Submit' ? handleSubmit():setAddSolution(newfunction,false)
    } 
  }

  const handleReset = () => {
    setJs()
  }

  const handleSubmit = () => {
    setAddSolution(newfunction,true)
  }

  return (
    <div className="form_container">
      <form onSubmit={handleTestInput}>
        <button name='Run' type="submit" className="btn">Run test</button>
      <button>Submit</button>
      </form>
      <button onClick={handleReset}>Reset</button>
      
      {/* nativeEvent.submitter.name */}
      
    </div>
  )
}



    // output === 0 ? setNewOutput(prev => {
    //   return {
    //     ...prev,
    //     [name]: response
    //   }
    // }):
    // name === 'result' ? setNewOutput(prev => {
    //   return {
    //     ...prev,
    //     output: {
    //       [output]:{
    //         [name]:response}
    //     }
    //   }
    // }):
    // setNewOutput(prev => {
    //   return {
    //     ...prev,
    //     output: {
    //       [output]:{
    //         [name]:response
    //       }
    //     }
    //   }
    // })

    // output === 0 ? newoutput[name] = response:
    // name === 'result' ? newoutput.output[output] = {[name]:response}:
    // newoutput.output[output][name] = response   
    // setNewOutput(newoutput)