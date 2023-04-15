import React, { useState,useEffect, useRef, useContext } from "react";
import { Controlled as ControlledEditor } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import championsService from "../services/championsService";
import Loading from '../assets/images/Logo/Loading.gif'
import { useNavigate, Link, useOutletContext, NavLink } from "react-router-dom";
import authService from "../services/authService";
import kataService from "../services/kataService";
import Kata from "./Kata";
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { AuthContext } from '../context/AuthContext';



export default function NewChampion(){
    const { storeToken, authenticateUser } = useAuth(); 
    const { user } = useContext(AuthContext); 

    // const {kata} = useOutletContext();
    const [champions,setChampions] = useState(undefined)
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [errorMessageNameFight,setErrorMessageNameFight] = useState('')
    const [NewChampion,setNewChampion] = useState({users_request:[]})
    const [initialUsers,setInitialUsers] = useState('')
    const [users,setUsers] = useState(undefined)
    const [usersSelected,setUsersSelected] = useState([])
    const [initialKatas,setInitialKatas] = useState('')
    const [katas,setKatas] = useState(undefined)
    const [searchUsers,setSearchUsers] = useState('')
    const [searchKata,setSearchKata] = useState('')
    const searchUsersValue = useRef()

    const usernameRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    

    const handleNewChampions = async function (e) {
        e.preventDefault();
        
            try {
                if(Object.keys(NewChampion).length === 3 && NewChampion.users_request.length>0){
                const response = await championsService.createChampions(NewChampion)
                // console.log(response)
                setLoading(false);
                setError(false);
                if (response.authToken) {
                    storeToken(response.authToken);
                    authenticateUser();
                    // console.log(user)
                    navigate('/profile/champions/request');
                    toast.success('Champions created!',{style:{backgroundColor:'#1a1e24', color:'white'}})
                } else {
                    toast.error("Sorry We couldn't create Champions",{style:{backgroundColor:'#1a1e24', color:'white'}})
                }
                }
                else {
                setErrorMessageNameFight({state:'error',message:'Please choose a kata, at least one opponent and a valid fight name'})
                }
            } catch (error) {
                setErrorMessageNameFight({state:'error',message:error})
                toast.error("Sorry We couldn't create your champions")
            }          
        
    }

    const getUsers = async function () {
        try {
            const response = await authService.getUsers()
            setInitialUsers(response)
            setUsers(response)
            setLoading(false)
        } catch (error) {
            setError(error)
        }
    }

    const getKatas = async function () {
        try {
            const response = await kataService.getKatas()
            setKatas(response)
            setInitialKatas(response)
            setLoading(false)
        } catch (error) {
            setError(error)
        }
    }

    useEffect (() => {
        getUsers()
        getKatas()
    },[])

    const handleSearch = (e) => {
        e.target.name === 'searchkata' ? setSearchKata(e.target.value):setSearchUsers(e.target.value);
      }

      const handleChange = (e) => {
        setNewChampion(prev => {
            return {
                ...prev,
                [e.target.name]:e.target.value
            }})
        e.target.name === 'namefight' &&
        (usernameRegex.test(e.target.value) ? setErrorMessageNameFight({state:false}):setErrorMessageNameFight({state:true,message:"Enter a valid username of at least 8 characters"}))
      }

      const handleKataChampion = (kata,name,level) => {
        setNewChampion(prev => {
            return {
                ...prev,
                kata:kata
            }
        })
        setKatas([{_id:kata,name:name,level:level}])
      }

      const handleUsersChampion = (user) => {
        const users_Copy = [...NewChampion.users_request]
        users_Copy.push(user._id)
        setNewChampion(prev => {
            return {
                ...prev,
                users_request:users_Copy
            }
        })
        setUsers(prev => [...prev].filter(elem => elem.username !== user.username))
        const usersSelected_Copy = [...usersSelected]
        usersSelected_Copy.push(user)
        setUsersSelected(usersSelected_Copy)
        setSearchUsers('')
      }

      const handleReset = (name) => {
        if(name==='kata'){
            const copyChampions = Object.assign({}, NewChampion)
            delete copyChampions.kata
            setNewChampion(copyChampions)
            setKatas(initialKatas)
        }
        else{
            setUsers(initialUsers)
            setUsersSelected([])
            searchUsersValue.current.value = ''
            const copyChampions = Object.assign({}, NewChampion)
            copyChampions.users_request = []
            setNewChampion(copyChampions)
        } 
      }

      const inputStyle = "w-full rounded-full  border-2 shadow-xl p-1 px-3 ";
      const validStyle = "text-green-input border-green-input validInput ";
      const invalidStyle = "text-red-input border-red-input invalidInput ";

    return(
        <div>
        {loading && <div className='flex justify-center mt-20'><img width='10%' src={Loading} alt='loading'/></div>}
        {!loading && users && katas &&
        <>
            <div className="flex flex-col items-center w-full">
            
            <form onSubmit={handleNewChampions} className='flex flex-col items-center text-white w-3/4 ml-2'>
            <button className={`text-sm p-1.5 px-6 my-2 mt-5 bg-background-lightcolor rounded-full border-1 border-background-lightcolor hover:border-white focus:border-white ${errorMessageNameFight.state === 'error' ? 'border-red-input text-red-input':'' }`} type="sumbit">Create Champions</button>
            {errorMessageNameFight.state === 'error' && <p className='text-xs text-red-input text-center mb-2'>{errorMessageNameFight.message}</p>}
                <label className='text-sm my-2 mt-4'>Name Fight</label>
                <input 
                required 
                type="text" 
                name="namefight"
                placeholder='Kata_Fight' 
                className={`searchbar text-center bg-background-lightcolor w-full ${inputStyle} ${errorMessageNameFight.state === false ? validStyle : errorMessageNameFight.state === true ? invalidStyle : ""}`}   
                onChange={handleChange}/>
                {errorMessageNameFight.state === true && <p className='text-xs text-red-input text-center'>{errorMessageNameFight.message}</p>}

                

                <div className="championsNew mt-6">
                    
                <div className="firstChampionsNew card_container">
                {usersSelected.length > 0 &&
                <>
                <p className='cursor-pointer text-sm text-center p-1.5 px-6 my-4 bg-background-lightcolor rounded-full border-1 border-background-lightcolor hover:border-white focus:border-white' onClick={handleReset}>Reset Opponents</p>
                <label className='text-sm my-2 flex justify-center'>{usersSelected.length} Opponent{usersSelected.length > 1 ? 's':''}  Selected</label>
                {usersSelected.map(elem => {
                        return (
                            <div key={elem._id} className="m-2 flex flex-wrap justify-center">
                                <div key={elem._id} className='w-11/12 flex flex-wrap justify-center'>
                                    <div className="flex justify-center items-center text-white w-full rounded-full hover:border-1 px-10 p-1 hover:border-white">
                                        <img className='rounded-lg' width='12%' referrerPolicy="no-referrer" src={elem.image} alt={`Image_${elem.username}`}/>
                                        <h3 className="ml-4 text-sm text-center bg-background-lightcolor p-1 rounded-full w-4/5">{elem.username}</h3>
                                    </div>
                                </div>
                            </div>)
                        })}
                </>}
                    
                    <label className='text-sm my-2 flex justify-center'>Add opponents (Max 3)</label>
                    <input 
                    type="text" 
                    name="searchusers"
                    ref={searchUsersValue}
                    className={`searchbar text-center bg-background-lightcolor w-full ${inputStyle}`} onChange={handleSearch} placeholder="Look for your opponents" />
                    <div className="overflow-y-auto max-h-56">
                        {users.length>0 ? 
                        <>
                            {users.filter(elem=>elem.username!==user.username).filter(elem => elem.username.toLowerCase().includes(searchUsers.toLowerCase())).length > 0 ? users.filter(elem=>elem.username!==user.username).filter(elem => elem.username.toLowerCase().includes(searchUsers.toLowerCase())).map(elem => {
                            return (
                                <div key={elem._id} onClick={()=>handleUsersChampion(elem)} className="cursor-pointer m-2 flex flex-wrap justify-center">
                                    <div key={elem._id} className='w-11/12 flex flex-wrap justify-center'>
                                        <div className="flex justify-center items-center text-white w-full rounded-full hover:border-1 px-10 p-1 hover:border-white">
                                            <img className='rounded-lg' width='12%' src={elem.image} alt={`Image_${elem.username}`}/>
                                            <h3 className="ml-4 text-sm text-center bg-background-lightcolor p-1 rounded-full w-4/5">{elem.username}</h3>
                                        </div>
                                    </div>
                                </div>)
                            }): <div><h2 className='mx-6 text-center text-white'>No users with that username have been found.</h2></div>}
                        </>:<div><h2 className='mx-6 text-center text-white'>There are no more users to fight with, sorry for the inconvenience</h2></div>}
                    </div>
                </div>

                
                <div className="secondChampionsNew card_container">
                    {!NewChampion.kata ?
                    <>
                        <label className='text-sm my-2 flex justify-center'>Choose Kata</label>
                        <input 
                        type="text" 
                        name="searchkata"
                        className={`searchbar text-center bg-background-lightcolor w-full ${inputStyle}`} onChange={handleSearch} placeholder="Multiply" />
                    </>
                        :
                        <p className='cursor-pointer text-sm p-1.5 px-6 my-4 bg-background-lightcolor rounded-full border-1 border-background-lightcolor hover:border-white focus:border-white' onClick={() => handleReset('kata')}>Choose another Kata</p>
                    }
                    <div className="overflow-y-auto max-h-56">
                       {katas.filter(elem => elem.name.toLowerCase().includes(searchKata.toLowerCase())).length > 0 ? katas.filter(elem => elem.name.toLowerCase().includes(searchKata.toLowerCase())).map(elem => {
                        return (
                            <div key={elem._id} className="mx-4">
                            <Kata champions={true} kata={elem} handleKataChampions={handleKataChampion}/>
                            </div>)
                        }): <div><h2 className='mx-6 text-center text-white'>No katas with that name or description have been found.</h2></div>} 
                    </div>
                    
                </div>
                </div>
                
            </form>
            </div>
        </>}
        {error && <p>Something went wrong. Couldn't find your kata</p>}
        </div>)
}