import React, { useState, useEffect } from 'react'

export default function Test({ input,setAddSolution,setJs,test_function,output}) { 

  const [newfunction, setNewFunction] = useState(input);
  const [validation,setValidation] = useState(0)
  const [error,setError] = useState(false)

useEffect(()=> {
  setNewFunction(input)
  },[input])
  
  const handleTestInput = (e) => {
    e.preventDefault()
    setValidation(0)
    try {
      output.map((elem,i) => {
      const input = test_function.split('${input}')
      const function_input = `${newfunction} ${input[0]}'${elem[0]}'${input[1]}`
      const response = eval(function_input)
      response === elem[1] && setValidation(prev => prev + 1)
      response === undefined && setError('undefined try again')
    })
    } catch (error) {
      setError(error.message)
    }
    finally{
      validation === output.length && e.target.name ==='submit' ?handleSubmit(): validation === output.length && handleRunTest()
    } 
  }

  const handleReset = () => {
    setJs()
  }

  const handleRunTest = () => {
    // console.log(true)
    setError(false)
  }

  const handleSubmit = () => {
    // console.log('submit')
    setError(false)
    setAddSolution(newfunction)
  }

  return (
    <div className="form_container">
      <form onSubmit={handleTestInput}>
        <p>Add up all the arguments</p>
        <button type="submit" className="btn">Run test</button>
        {validation === output.length ? 
      <button type="sumbit" name="submit" onClick={handleSubmit} style={{backgroundColor:'green'}}>Submit</button>:
      <button style={{backgroundColor:'red'}}>Submit</button>}
      </form>
      <button onClick={handleReset}>Reset</button>
      {validation === output.length && <h1 style={{color:'green'}}>WELL DONE</h1> }
      {error !== false && <h3 style={{color:'red'}}>{error}</h3>}
      
    </div>
  )
}