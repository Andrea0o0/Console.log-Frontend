import React,{useEffect, useState} from "react";
import { NavLink, Outlet } from 'react-router-dom';

export default function Profile(){
    const [activeChampions,setactiveChampions] = useState(undefined)

    useEffect(() => {
        (window.location.pathname.includes('champions')  && setactiveChampions(true))
        // eslint-disable-next-line
      },[window.location.pathname])

    return(
    <>
    <div className="flex justify-center">
         <ul className='profileOutlet flex justify-around text-white bg-background-lightcolor w-11/12 p-2 rounded-full'>
            <li><NavLink to={`/profile/user`}>Profile</NavLink></li>
            <li><NavLink to={`/profile/solutions`}>Solutions</NavLink></li>
            <li className={activeChampions===true ? "active":""}><NavLink to={`/profile/champions/new`}>Champions</NavLink></li>
        </ul>
    </div>
    
    <Outlet/>
    </>)
}