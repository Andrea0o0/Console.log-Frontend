import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function NotFound() {
  const location = useLocation();
 
  return (
    <div className='flex justify-center text-white'>
      <Link to="/"><p className='cursor-pointer'>Sorry, there is no URL called {location.pathname} in this website. You might want to go to the main site</p></Link>
    </div>
  )
}
