import React, {useState,useEffect, useContext} from "react";
import championsService from "../services/championsService";
import { toast } from "react-hot-toast";

export default function IntervalChampions({user,setRequestChampions}){

    // const initialMinute = Math.floor(initial_timer/60)
    // const initialSeconds = initial_timer-(initialMinute*60);
    // const [ minutes, setMinutes ] = useState({});
    // const [seconds, setSeconds ] =  useState({});
    const [time,setTime] = useState([])
    const [timer,setTimer] = useState(false)

    const getChampions = async function () {
        try {
            const response = await championsService.getChampionsByStatus('REQUEST')
            response.length>0 ? setRequestChampions(true):setRequestChampions(false)
            const newTime = []
            response.map((elem,i)=>{
                if(user._id === elem.users[0]){
                    newTime.push({
                        champions:elem,
                        minutes:Math.floor(elem.time/60),
                        seconds:elem.time - ((Math.floor(elem.time/60))*60)
                    }) 
                }
            })
            setTime(newTime)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditTimer = async function(elem){
        try {
            console.log(elem.minutes,elem.seconds)
            const response = await championsService.editTimeRequest(elem.champions._id,{time:((elem.minutes*60)+elem.seconds)})
        } catch (error) {
            console.log(error)
        }
    }

    const handleStart = async function(elem){
        try {
            setLoading(true)
        const response = await championsService.editStatus(elem.champions._id,{status:'START'})
            toast.success('Time to start your champions',{style:{backgroundColor:'#1a1e24', color:'white'}})
            getChampions()
            navigate('/profile/champions/inprogress')
        } catch (error) {
            toast.error('Sorry we have a problem ups!',{style:{backgroundColor:'#1a1e24', color:'white'}})
            console.log(error)
        }

    }

    const handleDelete = async function(championsId){
        try {
            await championsService.deleteChampions(championsId)
            toast.success('Champions deleted lack of opponents',{style:{backgroundColor:'#1a1e24', color:'white'}})
            getChampions()
        } catch (error) {
            toast.error('Sorry we have a problem ups!',{style:{backgroundColor:'#1a1e24', color:'white'}})
            console.log(error)
        }
    
    }

    useEffect(() => {
            time.map(elem => {
                ((elem.minutes*60)+elem.seconds) > 0 && handleEditTimer(elem)
            }) 
             
    },[time])

        
        useEffect(()=>{
            user && getChampions()      
        },[user]);

        useEffect(()=>{

            const newtime = [...time]
            time.map((elem,i) => {
                if (elem.seconds > 0) {
                    newtime[i].seconds = elem.seconds - 15;
                }
                if (elem.seconds === 0) {
                    if (elem.minutes === 0) {
                        user._id === elem.champions.users[0] && ((elem.minutes*60)+elem.seconds) < 1 && elem.champions.users.length > 1 ? handleStart(elem.champions._id): user._id === elem.champions.users[0] && ((elem.minutes*60)+elem.seconds) < 1 && elem.champions.users.length < 2 && handleDelete(elem.champions._id)
                    } else {
                        newtime[i].minutes = elem.minutes - 1
                        newtime[i].seconds = 59
                    }
                }
            })
            setTime(newtime)

        },[timer])

        useEffect(()=>{
            const myInterval = setInterval(() => {
                setTimer(prev => prev>7 ? 0:prev+1)
            }, 10000)
    
                 
                 return ()=> {
                     clearInterval(myInterval);
                   };  
                   
            },[time])
        

    return ( <>Hello</>      
    )
}