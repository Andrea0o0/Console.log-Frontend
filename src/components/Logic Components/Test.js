import React, { useState, useEffect } from 'react'

export default function Test({ input,setAddSolution,setJs,test_function,output,setOutput,initialOutput,level,champions,setAddSolutionChampions}) { 

  const [newfunction, setNewFunction] = useState(input);
  const [newoutput,setNewOutput] = useState(initialOutput)
  const [validation,setValidation] = useState(0)

useEffect(()=> {
  setNewFunction(input)
  },[input])

  const handleOutput = (output,name,response) => {
    let result = Object.assign({}, initialOutput)
    output === initialOutput ? setNewOutput(initialOutput):output === 0 ? result[name] = response:
    name === 'result' ? result.output[output] = {[name]:response}:result.output[output][name] = response 
    result.validation = validation
    result.random = Math.floor(Math.random()*400)+400
    setNewOutput(result)
  } 

  useEffect(()=> {
    handleOutput(0,'validation',validation)
    },[validation])
     // eslint-disable-next-line
  

  useEffect(()=> {
    setOutput(newoutput)
    },[newoutput])
     // eslint-disable-next-line

  const handleResetOutput = () => {
    setValidation(0)
  } 

  const handleTestInput = (e) => {
    handleResetOutput()
    const outputValidation = e.nativeEvent.submitter.name === 'Run' ? ([...output].slice(0,3)): [...output]
    try {
      outputValidation.map(async (elem,index) => {
      let i
      const callfunction = test_function.split('${input}')
      const input = elem[0]
      const function_input = `${newfunction} \n${test_function.includes('noinput') ? `${test_function.replaceAll('noinput','input')}`:`${callfunction[0]}${input}${callfunction[1]}`}`
      const response = await eval(function_input)
      let consolesfunction = ''
      if(function_input.includes('return')){
        const toconsoles = function_input.replaceAll('console.log','consoles.push')
        consolesfunction = eval(`let consoles = []
      ${toconsoles} 
      function extractconsoles(){return consoles}
      extractconsoles()`)
      }
      handleOutput(`output_${index+1}`,'result',elem)
      handleOutput(`output_${index+1}`,'return',response)
      consolesfunction !== undefined && consolesfunction.length > 0  ? handleOutput(`output_${index+1}`,'consoleslog',consolesfunction): handleOutput(`output_${index+1}`,'consoleslog','')
      const finalresponse = ((typeof response) === 'object' ? JSON.stringify(response): response)
      const finalreturn = ((typeof elem[1]) === 'object' ? JSON.stringify(elem[1]):elem[1])
      finalresponse === finalreturn && setValidation(prev => prev+1)
      response === undefined && handleOutput(0,'error',`ReferenceError: undefined try again
      MANDATORY: the function has to to return something  
      TIP => return :)`)
      })
    } catch (error) {
      handleOutput(0,'error',`SyntaxError: ${error.message}`)
    }
    finally{
      validation === outputValidation.length && e.nativeEvent.submitter.name ==='Submit' && handleSubmit()
    } 
  }

  const handleReset = () => {
    setJs()
  }

  const handleSubmit = () => {
    champions ? setAddSolutionChampions({function:newfunction,status:true}):setAddSolution({function:newfunction,status:true})
    }

  const handleBtns = (e) => {
    e.preventDefault()
    e.nativeEvent.submitter.name === 'Reset' ? handleReset():handleTestInput(e)
  }
  
  return (
    <div className="form_container">
      <form className={`btns_output btn_${level}`} onSubmit={handleBtns}>
        <button name='Run' type="submit" className="btn">Run test</button>
      <button className={`${Object.keys(newoutput.output).length <= 0 ? "":  validation === Object.keys(newoutput.output).length ? 'btn_green':'btn_red'}`} name='Submit'>{ validation === output.length ? 'Submit':'Attempt'}</button>
      <button name='Reset'>Reset</button>
      </form>      
    </div>
  )
}
