import React,{useState,useEffect} from "react";
import championsService from "../services/championsService";
import Loading from '../assets/images/Logo/Loading.gif'
import { Link, useNavigate } from "react-router-dom";
import YodaPatience from "../assets/images/Yoda/Yoda patience.svg"
import CardRequestChampions from "./CardRequest";
import { toast } from "react-hot-toast";

export default function RequestChampions(){

    const [championsRequest,setChampionsRequest] = useState(undefined)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();


    const getChampionsRequest = async function () {
        try {
            const response = await championsService.getChampionsByStatus('REQUEST')
            setLoading(false)
            setChampionsRequest(response)
        } catch (error) {
            setError(error)
            console.log(error)
        }
    }

    const editStatusUser = async function (championsId) {
        try {
            const response = await championsService.editUserRequest(championsId)
            console.log(response)
            setLoading(true)
            setChampionsRequest(response)
        } catch (error) {
            setError(error)
            console.log(error.message)
        }
    }

    const handleDelete = async function(championsId){
        try {
            setLoading(true)
            await championsService.deleteChampions(championsId)
            toast.success('Champions deleted lack of opponents',{style:{backgroundColor:'#1a1e24', color:'white'}})
        } catch (error) {
            toast.error('Sorry we have a problem ups!',{style:{backgroundColor:'#1a1e24', color:'white'}})
            console.log(error)
        }
    
    }


    const handleStart = async function(championsId){
        try {
            setLoading(true)
        const response = await championsService.editStatus(championsId,{status:'START'})
        console.log(response)
            toast.success('Time to start your champions',{style:{backgroundColor:'#1a1e24', color:'white'}})
            navigate('/profile/champions/inprogress')
        } catch (error) {
            toast.error('Sorry we have a problem ups!',{style:{backgroundColor:'#1a1e24', color:'white'}})
            console.log(error)
        }

    }

    useEffect(() => {
            getChampionsRequest()
            const intervalID = setInterval(() => {
                getChampionsRequest()
            }, 10000)
        
            return () => {
              clearInterval(intervalID);
            }
      
        
    },[])

    return (
        <>
        {loading && <div className='flex justify-center mt-20'><img width='10%' src={Loading} alt='loading'/></div>}
        {!loading && championsRequest &&
        <> 
            {championsRequest.length > 0 ? 
            <>
                {championsRequest.map(elem => {
                    return(
                <div className="my-2 flex justify-center" key={elem._id}>
                    <CardRequestChampions handleStart={handleStart} setLoading={setLoading} champions={elem} initial_timer={elem.time}  setStatusUser={editStatusUser} handleDelete={handleDelete}/>
                </div>)})}
            </>:
            <>
                <div className="flex justify-center my-4">
                    <Link to='/profile/champions/new' className="flex flex-wrap w-3/4 justify-center p-3 pb-8 rounded-full bg-background-lightcolor hover:w-4/5 yoda">
                        <img width='20%' className="m-2" src={YodaPatience} alt='yoda happy'/>
                        <h3 className="w-4/5 text-center text-white text-normal">You still have no Champions Request <br/> Patience you must have my young padawan</h3>
                    </Link>
                </div>
            </>}
        </>}
        {error && <p>{error.message}</p>}
        </>
    )
}