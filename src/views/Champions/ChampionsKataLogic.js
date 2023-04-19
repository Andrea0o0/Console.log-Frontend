import React,{useState,useEffect} from "react";
import { useParams, useNavigate, NavLink, Outlet } from "react-router-dom";
import Editor from "../../components/Logic Components/Editor";
import Test from "../../components/Logic Components/Test";
import solutionService from "../../services/solutionService";
import kataService from "../../services/kataService";
import championsService from "../../services/championsService"
import { toast } from "react-hot-toast";
import Loading from '../../assets/images/Logo/Loading.gif'
import Kata from "../../components/Details Kata/Kata";


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

      useEffect(() => {
        const intervalID = setInterval(() => {
          getChampionsKata()
        }, 7000)
    
        return () => {
          clearInterval(intervalID);
        }
        // eslint-disable-next-line
      }, [])
      
      useEffect(() => {
        getKata();
        getSolutionsKata()
        getChampionsKata()
        // eslint-disable-next-line
      }, [kataId])

      useEffect(() => {
        createSolution(newSolution)
        createSolutionChampions(newSolution)
        // eslint-disable-next-line
      }, [newSolution])

    const getSolutionsKata = async () => {
      try {
        const response = await solutionService.getSolutionsUserKata(kataId);
        setSolutions(response);
      } catch (error) {
        setLoading(false);
        setError(true)
      }
    }

    const createSolutionChampions = async (solution) => {
      try {
        await championsService.winnerChampions(champions._id,{function:newSolution.function})
        navigate('/profile/champions/completed')
        toast.success("Congratulations, You're the WINNER!!",{style:{backgroundColor:'#1a1e24', color:'white'}})
      } catch (error) {
        
      }
    }

    const getChampionsKata = async () => {
      try {
        const response = await championsService.getOneChampion(championsId);
        if(response.winner){ 
          navigate('/profile/champions/completed')
          toast(`Sorry, ${response.winner.username} has won!!`,
          {
            style:{backgroundColor:'#1a1e24', color:'white'},
            icon:'😢'
          })
        }
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
          navigate(`/katas/champions/${response._id}/${championsId}/output`)
        } catch (error) {
          console.error(error)
          setLoading(false);
          setError(true)
        }
      }

      const createSolution = async (newSolution) => {
        try {
          await solutionService.createSolution(newSolution);
        } catch (error) {
          console.error(error)
        }
      }    

      const handleAddSolution = async (newfunction) => {
        await setNewSolution(prev=>{
          return {
            ...prev,
            function:newfunction.function,
            status:newfunction.status
          }})
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
                          <div className="flex justify-start my-1 w-2/5 items-center mr-1 tall:w-1/5" key={elem._id}>
                              <img width='14%' className="rounded-full" src={elem.image} alt={`image_${elem.username}`}/> 
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
              setAddSolutionChampions={handleAddSolution} champions={true} reset={initialState}  setJs={handleReset} test_function={kata.input} output={kata.output} kata={kata} setOutput={handleOutput} initialOutput={initialOutput} level={kata.level}></Test>
          </div>
        </div>
      </div>          
      }
      {error && 
      <div className="flex justify-center text-white">
        <p className="text-center">Something went wrong. Couldn't find your kata & champions</p>
      </div>} 
        </>
    )
}