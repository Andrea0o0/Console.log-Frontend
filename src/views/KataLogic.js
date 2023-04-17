import React,{useState,useEffect} from "react";
import { useParams,NavLink, Outlet } from 'react-router-dom';
import Editor from "../components/Logic Components/Editor";
import Test from "../components/Logic Components/Test";
import kataService from "../services/kataService";
import solutionService from "../services/solutionService";
import Kata from "../components/Details Kata/Kata";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from '../assets/images/Logo/Loading.gif'

export default function KataLogic(){
    const {kataId} = useParams()
    const navigate = useNavigate();

    const initialOutput = {
      output:{},
      error:'',
      validation:0,
      random:0
    }

    const initialSolution = {
      "function": '',
      "status":'',
      "kata":''
    }
    const [loading, setLoading] = useState(true);
    const [newSolution,setNewSolution] = useState(initialSolution)
    // eslint-disable-next-line
    const [error, setError] = useState(false);
    const [kata,setkata] = useState(null)
    const [solutions,setSolutions] = useState('')
    const [initialState,setInitialState] = useState(null)
    const [output,setOutput] = useState(initialOutput)

    // const [outputToggle,setOutputToggle] = useState(true)

    const [js,setJs] = useState(initialState)

    const getSolutionsKata = async () => {
      try {
        const response = await solutionService.getSolutionsUserKata(kataId);
        setSolutions(response);
      } catch (error) {
        setLoading(false);
        setError(true)
      }
    }

    const getKata = async () => {
        try {
          const response = await kataService.getOneKata(kataId);
          setkata(response);
          setJs(response.initialValue)
          setInitialState(response.initialValue)
          setNewSolution(prev => {
            return {
              ...prev,
              kata:kataId
            }
          })
          setLoading(false);
          setError(false);
          navigate(`/kata/practise/${response._id}/output`)
        } catch (error) {
          setLoading(false);
          setError(true)
        }
      }

      useEffect(() => {
        getKata();
        getSolutionsKata()
        // eslint-disable-next-line
      }, [kataId])

      useEffect(() => {
        createSolution(newSolution)
        // eslint-disable-next-line
      }, [newSolution])

    const handleReset = () => {
      setJs(initialState)
    }

    const createSolution = async (newSolution) => {
      try {
        const response = await solutionService.createSolution(newSolution);
        if (response) {
          navigate('/');
          toast.success('Solution Created!',{style:{backgroundColor:'#1a1e24', color:'white'}})
        } else {
          toast.error("Sorry we can't create your Solution",{style:{backgroundColor:'#1a1e24', color:'white'}})
        }
      } catch (error) {
        setError(true)
      }
    }    

    const handleAddSolution = async (newfunction) => {
      await setNewSolution(prev => {
        return {
          ...prev,
          function:newfunction.function,
          status:newfunction.status
        }
      })
      //SOLUTION
    }

    const handleOutput = (newoutput) => {
      setOutput(newoutput)
    }

    return (
        <>     
        {loading && <div className='flex justify-center mt-20'><img width='10%' src={Loading} alt='loading'/></div>}
      {!loading && kata && 
      <div className="m-6">
        <Kata kata={kata} practise={true}/>
        <div className='kata_display'>
          <div className={`kata_display_1 _kata_${kata.level}`}>
            <ul className='editor-title'>
              <li style={{width:solutions === null ? '53%' :'24%'}}
              ><NavLink to={`/kata/practise/${kata._id}/output`}>Output</NavLink></li>
              <li style={{width:solutions.length === 0 || solutions === null? '48%' :''}}><NavLink to={`/kata/practise/${kata._id}/instructions`}>Instructions</NavLink></li>
              {solutions.length !== 0 &&
              <li style={{width:'38%'}}><NavLink to={`/kata/practise/${kata._id}/pastsolutions`}>Past Solutions</NavLink></li>}
            </ul>
            <Outlet context={{example:kata.example,instructions:kata.instructions.split("<ControlledEditor/>"),output:output,kata:kata,solutions:solutions}} />
          </div>          
          <div className='kata_display_2'> 
              <Editor language='javascript' displayName={`Solution => ${kata.name}`} value={js} onChange={setJs} level={kata.level} createSolution={createSolution} newSolution={newSolution}/>
              <Test input={js} 
              setAddSolution={handleAddSolution} reset={initialState}  setJs={handleReset} test_function={kata.input} output={kata.output} kata={kata} setOutput={handleOutput} initialOutput={initialOutput} level={kata.level}></Test>
          </div>
        </div>
      </div>          
      }
      {error && 
      <div className="flex justify-center text-white">
        <p className="text-center">Something went wrong. Couldn't find your kata</p>
      </div>}     
        </>
    )
}