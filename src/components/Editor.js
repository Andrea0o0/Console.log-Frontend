import React, { useState, useEffect } from 'react'

export default function Form({ input,setAddFunction,reset}) {
  const test = [
    {
      arguments:'[2,3]',
      return:5
    },
    {
      arguments:'[2,1]',
      return:3
    },
    {
      arguments:'[2,3,1]',
      return:6
    },
    {
      arguments:'[5,3]',
      return:8
    },
  ]

  // function input (array) {
  //   const sum = array.reduce(
  //     (accum, cValue) => accum + cValue,
  //     0)
  //   return sum
  //   }
 

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
      test.map((elem,i) => {
      let function_validation = `${newfunction} input(${elem.arguments})`
      const response = eval(function_validation)
      response === elem.return && setValidation(prev => prev + 1)
      response === undefined && setError('undefined try again')
    })
    } catch (error) {
      setError(error.message)
    }
    finally{
      validation === test.length && e.target.name ==='submit' ?handleSubmit(): validation === test.length && handleRunTest()
    } 
  }

  const handleReset = () => {
    setAddFunction(reset)
  }

  const handleRunTest = () => {
    // console.log(true)
    setError(false)
  }

  const handleSubmit = () => {
    // console.log('submit')
    setError(false)
    setAddFunction(newfunction)
  }

  return (
    <div className="form_container">
      <form onSubmit={handleTestInput}>
        <p>Add up all the arguments</p>
        <button type="submit" className="btn">Run test</button>
        {validation === test.length ? 
      <button type="sumbit" name="submit" onClick={handleSubmit} style={{backgroundColor:'green'}}>Submit</button>:
      <button style={{backgroundColor:'red'}}>Submit</button>}
      </form>
      <button onClick={handleReset}>Reset</button>
      {validation === test.length && <h1 style={{color:'green'}}>WELL DONE</h1> }
      {error !== false && <h3 style={{color:'red'}}>{error}</h3>}
      
    </div>
  )
}