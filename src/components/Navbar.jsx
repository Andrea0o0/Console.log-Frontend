import React, { useContext, useRef,useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import championsService from '../services/championsService';
import Logo from '../assets/images/Logo/LOGO.svg'
import Back from '../assets/images/navbar/back hover.svg'
import ChampionsBeat from '../assets/images/Champions/beat.gif'
import Champions from '../assets/images/Champions/no_beat.svg'
import toast from 'react-hot-toast';


export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 

  const [request,setRequest] = useState(false)
  const [error,setError] = useState(false)
  const navigate = useNavigate();
  const navRef = useRef()

  const [backhover,setHover] = useState(false)

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav")
  }

  const handleRequest = async function () {
    try {
      if(user){
        const response = await championsService.getChampionsByStatus('REQUEST')
      if(response.length>0 && request===false){
        setRequest(true) 
        toast(<Link to='/profile/champions/request'>"New champions Request!!"</Link>, {
        icon: <img src={Champions} width='10%' alt='Champions Beat' />,
        style:{backgroundColor:'#1a1e24', color:'white'}
      });
      } else if (response.length<1){
        setRequest(false)
      } 
      }
    } catch (error) {
      setError(true)
    }
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      handleRequest()
    }, 10000)

    return () => {
      clearInterval(intervalID);
    }

  })


  return (
    <>
      <header className='bg-background-lightcolor mb-2'>
      <div className='flex items-center justify-around h-20 px-8 text-white'>
      <Link to="/" className='cursor-pointer'><img className='Logo m-0' src={Logo} width='40%' alt='logo'/></Link>
      {user ? <Link to='profile/champions/new' className='championsbeat'><img src={Champions} alt='Champions Beat' /></Link>: user && request && <Link to='profile/champions/request' className='championsbeat'><img src={ChampionsBeat} alt='Champions Beat' /></Link>}
      {user ? <Link className='flex cursor-pointer items-center justify-center m-0 pl-2 w-52' to='/profile/user'><li className='flex items-center' referrerPolicy="no-referrer" onMouseEnter={() => setHover(prev => !prev)}
        onMouseLeave={() => setHover(prev =>!prev)}>
        <img width='20%' className='mr-2 rounded-lg' src={user.image} alt='back'/>  {user.username}
           </li></Link>:<p><Link to='/signup' className='navbarlink text-xs w-60 text-center text-white cursor-pointer'>Signup or Login to not be a stranger</Link> 😶‍🌫️</p> }
        <nav className='navLinks' ref={navRef}>
          <li onClick={showNavbar}><NavLink to="/">Home</NavLink></li>
          {!isLoggedIn && <li onClick={showNavbar}><NavLink to="/signup">Sign up</NavLink></li>}
          {!isLoggedIn && <li onClick={showNavbar}><NavLink to="/login">Login</NavLink></li>}       
          {isLoggedIn && <li onClick={showNavbar}><NavLink to="/profile/champions/new">Champions</NavLink></li>}
          {isLoggedIn && <li onClick={showNavbar}><NavLink to="/profile/user">Profile</NavLink></li>}
          {isLoggedIn && <li className='cursor-pointer' onClick={() => { logOutUser();showNavbar()}}>Log out</li>}
          <li onClick={() => {navigate(-1);showNavbar()}} className='flex cursor-pointer items-center justify-center m-0 p-0 w-36' onMouseEnter={() => setHover(prev => !prev)}
        onMouseLeave={() => setHover(prev =>!prev)}>
        {backhover ? <img width='15%' className='pr-2' src={Back} alt='back'/>:<FontAwesomeIcon className='pr-2' icon="fa-solid fa-arrow-left"/>} Go back
           </li>
          <button className='nav-btn nav-close-btn' onClick={showNavbar}>
            <FontAwesomeIcon icon="fa-solid fa-rectangle-xmark" style={{color: "#ffffff"}}/>
          </button>
        </nav>
        <button className='nav-btn' onClick={showNavbar}>
        <FontAwesomeIcon icon="fa-solid fa-bars fa-2xl" with='45%' style={{color: "#ffffff",}} />
          </button>
          </div>
        </header>
        {error && 
          <div className="flex justify-center text-white">
            <p className="text-center">Something went wrong. Couldn't find your kata</p>
          </div>} 
        </>
  )
}
