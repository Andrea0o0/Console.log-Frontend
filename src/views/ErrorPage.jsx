import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className='flex justify-center text-white'>
    <Link to="/">
    <p className='cursor-pointer'>Ooops something went wrong while fetching the information you requested. Here is an alternative:</p>
    </Link>
    </div>
  )
}
