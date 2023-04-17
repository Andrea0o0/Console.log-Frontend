import React,{useState,useEffect} from "react";
import { useParams, useNavigate, NavLink,Link, Outlet } from "react-router-dom";
import Editor from "../components/Editor";
import Test from "../components/Test";
import solutionService from "../services/solutionService";
import kataService from "../services/kataService";
import championsService from "../services/championsService"
import { toast } from "react-hot-toast";
import Loading from '../assets/images/Logo/Loading.gif'
import Kata from "../components/Kata";


export default function ChampionsKataLogic(){
    const {kataId} = useParams()
    const championsId = window.location.pathname.includes('pastsolutions')||window.location.pathname.includes('output')||window.location.pathname.includes('instructions') ? window.location.pathname.split('/')[window.location.pathname.split('/').length-2]:window.location.pathname.split('/')[window.location.pathname.split('/').length-1]

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
      const [champions,setChampions] = useState(null)
      const [solutions,setSolutions] = useState('')
      const [initialState,setInitialState] = useState(null)
      const [output,setOutput] = useState(initialOutput)
 

      const [js,setJs] = useState(initialState)

      // useEffect(() => {
      //   const intervalID = setInterval(() => {
          
      //   }, 10000)
    
      //   return () => {
      //     clearInterval(intervalID);
      //   }
    
      // }, [])
      
      useEffect(() => {
        getKata();
        getSolutionsKata()
        getChampionsKata()
        // eslint-disable-next-line
      }, [kataId])

      useEffect(() => {
        createSolution(newSolution)
        // eslint-disable-next-line
      }, [newSolution])

    const getSolutionsKata = async () => {
      try {
        const response = await solutionService.getSolutionsUserKata(kataId);
        setSolutions(response);
      } catch (error) {
        console.error(error)
        setLoading(false);
        setError(true)
      }
    }

    const getChampionsKata = async () => {
      try {
        const response = await championsService.getOneChampion(championsId);
        setChampions(response);
      } catch (error) {
        console.error(error)
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
        //   /katas/champions/:kataId/:championsId
          navigate(`/katas/champions/${response._id}/${championsId}/output`)
        } catch (error) {
          console.error(error)
          setLoading(false);
          setError(true)
        }
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
          console.error(error)
        }
      }    

      const handleAddSolution = async (newfunction,completed) => {
        await setNewSolution(prev => {
          return {
            ...prev,
            function:newfunction,
            status:completed
          }
        })
        //SOLUTION
      }
  
      const handleOutput = (newoutput) => {
        setOutput(newoutput)
      }

      const handleReset = () => {
        setJs(initialState)
      }

    return(
    <>
        {loading && <div className='flex justify-center'><img width='10%' src={Loading} alt='loading'/></div>}
        {!loading && kata && champions &&
        <div className="mx-6">
          <div className="flex justify-center">
            <div id='championsOnKata' className={`flex flex-wrap text-white justify-center my-2 py-1 bg-background-lightcolor rounded-full w-full border-1 ${kata.level === 5 ? 'border-color-5':kata.level === 4 ? 'border-color-4':kata.level === 3 ? 'border-color-3':kata.level === 2 ? 'border-color-2':'border-color-1'}`}>     
                  {champions.users.map(elem => {
                      return (
                          <div className="flex justify-center my-1 w-1/3 items-center mx-1" key={elem._id}>
                              <img width='20%' className="rounded-lg" src={elem.image} alt={`image_${elem.username}`}/> 
                              <p className="w-1/3 px-1">{elem.username}</p>
                          </div>
                      )
                  })}
            </div>
        </div>
        <Kata kata={kata} championsfight={true}/>
        <div className='kata_display'>
          <div className={`kata_display_1 _kata_${kata.level}`}>
            <ul className='editor-title'>
              <li style={{width:solutions === null ? '53%' :'24%'}}
              ><NavLink to={`/katas/champions/${kata._id}/${championsId}/output`}>Output</NavLink></li>
              <li style={{width:solutions.length === 0 || solutions === null? '48%' :''}}><NavLink to={`/katas/champions/${kata._id}/${championsId}/instructions`}>Instructions</NavLink></li>
              {solutions.length !== 0 &&
              <li style={{width:'38%'}}><NavLink to={`/katas/champions/${kata._id}/${championsId}/pastsolutions`}>Past Solutions</NavLink></li>}
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
      {error && <p>Something went wrong. Couldn't find your kata</p>}     
        </>
    )
}