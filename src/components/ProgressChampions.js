import React,{useState,useEffect} from "react";
import championsService from "../services/championsService";
import Loading from '../assets/images/Logo/Loading.gif'
import { Link } from "react-router-dom";
import YodaPatience from "../assets/images/Yoda/Yoda patience.svg"
import CardInProgress from "./CardInProgress";

export default function ProgressChampions(){

    const [championsProgress,setChampionsProgress] = useState(undefined)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    const getChampionsInProgress = async function () {
        try {
            const response = await championsService.getChampionsByStatus('START')
            response.length>0 && response.sort((a,b)=>a.updatedAt - b.updatedAt).reverse()
            setLoading(false)
            setChampionsProgress(response)
        } catch (error) {
            setError(error)
            console.log(error)
        }
    }

    const editStatusUser = async function (championsId) {
        try {
            const response = await championsService.editUserRequest(championsId)
            console.log(response)
            setLoading(false)
            setChampionsProgress(response)
        } catch (error) {
            setError(error)
            console.log(error.message)
        }
    }

    useEffect(() => {
        getChampionsInProgress()
        
    },[])

    return (
        <>
        {loading && <div className='flex justify-center mt-20'><img width='10%' src={Loading} alt='loading'/></div>}
        {!loading && championsProgress &&
        <> 
            {championsProgress.length > 0 ? 
            <>  
                <div className="text-white flex justify-center w-full px-4">
                    <h3 className="text-sm text-center">Remember that unfinished champions are automatically deleted in 10 days</h3>
                </div>                    
                {championsProgress.map(elem => {
                    let initial_timer = localStorage.getItem(`champions_${elem._id}`) ? 
                    localStorage.getItem(`champions_${elem._id}`):300
                    return(
                <div className="my-2 flex justify-center" key={elem._id}>
                    <CardInProgress champions={elem} initial_timer={initial_timer}  setStatusUser={editStatusUser}/>
                </div>)})}
            </>:
            <>
                <div className="flex justify-center my-4">
                    <Link to='/profile/champions/new' className="flex flex-wrap w-3/4 justify-center p-3 pb-8 rounded-full bg-background-lightcolor hover:w-4/5 yoda">
                        <img width='20%' className="m-2" src={YodaPatience} alt='yoda happy'/>
                        <h3 className="w-4/5 text-center text-white text-normal">You still have no Champions In Progress <br/> Patience you must have my young padawan</h3>
                    </Link>
                </div>
            </>}
        </>}
        {error && <p>{error.message}</p>}
        </>
    )
}