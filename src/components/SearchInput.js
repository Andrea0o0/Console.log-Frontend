import React,{useState,useEffect} from 'react'
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
import { Link } from 'react-router-dom';

export default function SearchInput(props) {

  const { handleSearchKata, levels } = props;

  const handleChange = (e) => {
    handleSearchKata(e.target.value)
  }

  const [hover,setHover] = useState({
    _5:false,
    _4:false,
    _3:false,
    _2:false,
    _1:false})
  const [srcImage,setSrcImage] = useState({
    _5:L5,
    _4:L4,
    _3:L3,
    _2:L2,
    _1:L1})

    const handleHover = (level) => {
      const hoverr = hover[`_${level}`] ? false:true
        setHover(prev => {
          return {
            ...prev,
            [`_${level}`]:hoverr
          }
        })
      const value_Image = hoverr ? (level === 1 ? L1_hover:level === 2 ? L2_hover:level === 3 ? L3_hover: level === 4 ? L4_hover:L5_hover):(level === 1 ? L1:level === 2 ? L2:level === 3 ? L3: level === 4 ? L4:L5)
        setSrcImage(prev => {
          return {
            ...prev,
            [`_${level}`]:value_Image
          }
        })
    }

    const handleClick = () => {
      
    }

  return (
    <>
      <div className='Kata card'>
        <input className='searchbar text-white bg-transparent px-2 w-full' type="text" name="search" onChange={handleChange} placeholder="What are you looking for?" />
      </div>
      <div className='w-full flex flex-wrap items-center justify-center'>
        {Object.keys(srcImage).map((key,i)=>{ 
        return(
        <div key={i} className={`filterlevels card w-20 mx-2 ${hover ? `hover_${i+1}`:`_${i+1}`}`} onMouseEnter={() => handleHover(i+1)}
    onMouseLeave={() => handleHover(i+1)}>
          <a>
            <div className='level'>
                <img src={srcImage[`_${i+1}`]} alt={`Level${i+1}`}/>
                <div className='img_level'>{`${i+1}JS`}</div>
            </div>
          </a>
        </div>)
        })}
      </div>      
    </>
  )
}