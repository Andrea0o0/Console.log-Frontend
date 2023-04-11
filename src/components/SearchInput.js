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
import High from '../assets/images/SearchBar/Highest Level.svg'
import Low from '../assets/images/SearchBar/Lowest Level.svg'
import { Link } from 'react-router-dom';

export default function SearchInput(props) {

  const { handleSearchKata, handleLevels, handleSortByLevel } = props;

  const handleChange = (e) => {
    handleSearchKata(e.target.value)
  }
  const [infoSelect,setInfoSelect] = useState('')

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
  const [select,setSelect] = useState([])
  const [selectSort,setSelectSort] = useState({High:false,Low:false})

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

    const handleSelect = (level) => {
      const newSelect = [...select]
      newSelect.indexOf(level) > -1 ? newSelect.splice(select.indexOf(level),1) :newSelect.push(level)
      setSelect(newSelect)
      handleLevels(newSelect)
    }

    const handleSort = (order) => {
      handleSortByLevel(order)
    }

    const selectItem = "bg-background-lightcolor"
    const unselectItem = "bg-transparent"
    const sortstyle = 'flex justify-center items-center rounded-full border-1 border-background-lightcolor bg-background-lightcolor card mx-1 cursor-pointer'

    useEffect(() => {
      const selectSorted = select.sort()
      const response = select.length === 0  ? "No level selected": select.length === 1 ? `Level ${selectSorted[0]} is the only one selected`: select.length === 2 ? `Levels ${selectSorted[0]} and ${selectSorted[1]} are selected`: select.length === 3 ? `Levels ${selectSorted[0]}, ${selectSorted[1]} and ${selectSorted[2]} are selected`: select.length === 4 ? `Levels ${selectSorted[0]}, ${selectSorted[1]}, ${selectSorted[2]} and ${selectSorted[3]} are selected`:`All levels are selected, from 1 to 5`
      setInfoSelect(response)
    },[select])

    // ${selectSort.High===true ? "border-1 border-white":""}`}
  return (
    <>
      <div className='Kata card'>
        <input className='searchbar text-white bg-transparent px-2 w-full' type="text" name="search" onChange={handleChange} placeholder="What are you looking for?" />
      </div>
      <div className='flex flex-wrap items-center justify-center'>
        <div className='level_selector w-full flex flex-wrap items-center justify-center'>
          <div className='infoselect w-4/5 mx-3 mb-1 rounded-full bg-background-lightcolor card text-center text-no-select'><p className='text-xs py-0.5'>{infoSelect}</p></div>
          {Object.keys(srcImage).map((key,i)=>{ 
          return(
          <div key={i} className={`cursor-pointer rounded-full p-2 ${select.indexOf(i+1) > -1 ? selectItem:unselectItem} filterlevels card w-20 mx-1 ${hover ? `hover_${i+1}`:`_${i+1}`}`} onMouseEnter={() => handleHover(i+1)}
      onMouseLeave={() => handleHover(i+1)} onClick={()=>handleSelect(i+1)}>
            <a>
              <div className='level'>
                  <img src={srcImage[`_${i+1}`]} alt={`Level${i+1}`}/>
                  <div className='img_level'>{`${i+1}JS`}</div>
              </div>
            </a>
          </div>)
          })}
        </div>  
        <div className='sortedlevels w-4/5 mt-2 p-1 text-no-select flex justify-center'>
            <div className={sortstyle} onClick={()=>{handleSort(true);setSelectSort(prev=>{return{...prev,High:!selectSort.High}})}}>
                <p className='text-xs mx-1'>Highest Level</p>
                <img width='15%' src={High} alt='highest'/>
            </div>
            <div className={sortstyle} onClick={()=>handleSort(false)}>
                <img width='15%' src={Low} alt='highest'/>
                <p className='text-xs mx-1'>Lowest Level</p>
            </div>
        </div>    
      </div>
      
    </>
  )
}