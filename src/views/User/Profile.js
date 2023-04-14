import React,{useEffect} from "react";
import { NavLink, Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Profile(){
    const navigate = useNavigate();

    return(
    <>
    <div className="flex justify-center">
         <ul className='profileOutlet flex justify-around text-white bg-background-lightcolor w-11/12 p-2 rounded-full'>
            <li><NavLink to={`/profile/user`}>Profile</NavLink></li>
            <li><NavLink to={`/profile/solutions`}>Solutions</NavLink></li>
            <li><NavLink to={`/profile/champions`}>Champions</NavLink></li>
        </ul>
    </div>
    
    <Outlet/>
    </>)
}