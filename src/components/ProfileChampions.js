import React, { useState,useEffect } from "react";
import { Controlled as ControlledEditor } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import championsService from "../services/championsService";
import Loading from '../assets/images/Logo/Loading.gif'
import { useNavigate, Link, useOutletContext, NavLink,Outlet } from "react-router-dom";
import YodaHappy from "../assets/images/Yoda/Yoda happy.svg"


export default function ProfileChampions(){

    // const {kata} = useOutletContext();
    const [champions,setChampions] = useState(undefined)
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(false);


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