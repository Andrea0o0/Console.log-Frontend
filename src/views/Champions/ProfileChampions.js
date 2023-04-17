import React from "react";
import { NavLink,Outlet } from "react-router-dom";


export default function ProfileChampions(){

    return(
        <>
          <div className="flex justify-center m-3">
                <ul className='profileOutlet flex justify-around text-white bg-background-lightcolor w-11/12 p-2 rounded-full'>
                    <li><NavLink to={`/profile/champions/new`}>New</NavLink></li>
                    <li><NavLink to={`/profile/champions/request`}>Request</NavLink></li>
                    <li><NavLink to={`/profile/champions/inprogress`}>In Progress</NavLink></li>
                    <li><NavLink to={`/profile/champions/completed`}>Completed</NavLink></li>
                </ul>
            </div>
            <Outlet/>
        </>)
}