import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import L1 from '../assets/images/levels/1.svg'
import L2 from '../assets/images/levels/2.svg'
import L3 from '../assets/images/levels/3.svg'
import L4 from '../assets/images/levels/4.svg'
import L5 from '../assets/images/levels/5.svg'
import L1_hover from '../assets/images/levels/1 HOVER.svg'
import L2_hover from '../assets/images/levels/2 HOVER.svg'
import L3_hover from '../assets/images/levels/3 HOVER.svg'
import L4_hover from '../assets/images/levels/4 HOVER.svg'
import L5_hover from '../assets/images/levels/5 HOVER.svg'

export default function Kata({ kata : {name, level, _id},practise,solutions,champions, handleKataChampions }) {
    const [hover,setHover] = useState(false)
    const [srcImage,setSrcImage] = useState('')

    const handleSrcImage = () => {
        hover ? setSrcImage(level === 1 ? L1_hover:level === 2 ? L2_hover:level === 3 ? L3_hover: level === 4 ? L4_hover:L5_hover):setSrcImage(level === 1 ? L1:level === 2 ? L2:level === 3 ? L3: level === 4 ? L4:L5)
    }

    const handleHover = () => {
        setHover(prev => !prev)
    }

    useEffect(() => {
        handleSrcImage()
        // eslint-disable-next-line
    },[hover])

  return (    
    <div className={`Kata ${hover ? `hover_${level}`:`_${level}`}`} onMouseEnter={handleHover}
    onMouseLeave={handleHover}>
        {!practise && !solutions && !champions ? 
        (<Link to={`/katas/${_id}`}>
            <div className='level'>
                <img src={srcImage} alt={`Level${level}`}/>
                <div className='img_level'>{`${level}JS`}</div>
            </div>
            <h3>{name}</h3> 
        </Link>):solutions ?
        (<Link to={`/katas/${_id}`} id='solutionsKata' className='w-4/5'>
            <div className='level solution'>
                <img src={srcImage} alt={`Level${level}`}/>
                <div className='img_level text-xs'>{`${level}JS`}</div>
            </div>
            <h3 className='text-xl'>{name}</h3> 
        </Link>):champions ?
          // eslint-disable-next-line
        (<a id='solutionsKata' className='cursor-pointer w-4/5' onClick={()=>handleKataChampions(_id,name,level)}>
            <div className='level solution'>
                <img src={srcImage} alt={`Level${level}`}/>
                <div className='img_level text-xs'>{`${level}JS`}</div>
            </div>
            <h3 className='text-xl'>{name}</h3> 
        </a>):
          // eslint-disable-next-line
        (<a className='w-4/5'>
            <div className='level'>
                <img src={srcImage} alt={`Level${level}`}/>
                <div className='img_level text-xs'>{`${level}JS`}</div>
            </div>
            <h3 className='text-xl'>{name}</h3> 
        </a>)
        }
    </div>
   
      
    
  )
}
