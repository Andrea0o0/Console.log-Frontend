import React, { useContext, useRef,useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../assets/images/Logo/LOGO.svg'
import Back from '../assets/images/navbar/back hover.svg'


export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 
  const navigate = useNavigate();
  const navRef = useRef()

  const [backhover,setHover] = useState(false)

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav")
  }


  // WebkitTextFillColor:"transparent"}

  return (
      <header className='bg-background-lightcolor flex items-center justify-around h-20 px-8 text-white mb-10'>
      <Link to="/"><img className='Logo m-0' src={Logo} width='50%' alt='logo'/></Link>
        {user ? <Link to="/profile" className='navbarlink w-60 cursor-pointer text-white text-xs'><p>Hello {user.username}</p></Link>:<p><Link to='/signup' className='navbarlink text-xs w-60 text-center text-white cursor-pointer'>Signup or Login to not be a stranger</Link> 😶‍🌫️</p> }
        <nav className='w-3/4' ref={navRef}>
          <li><NavLink to="/">Home</NavLink></li>
          {!isLoggedIn && <li><NavLink to="/signup">Sign up</NavLink></li>}
          {!isLoggedIn && <li><NavLink to="/login">Login</NavLink></li>}       
          {isLoggedIn && <li><NavLink to="/private">Private view</NavLink></li>}
          {isLoggedIn && <li><NavLink to="/profile">Profile</NavLink></li>}
          {isLoggedIn && <li onClick={() => logOutUser()}>Log out</li>}
          <li onClick={() => navigate(-1)} className='flex cursor-pointer items-center justify-center m-0 p-0 w-36' onMouseEnter={() => setHover(prev => !prev)}
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
        </header>
  )
}
