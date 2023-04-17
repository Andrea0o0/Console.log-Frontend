import React,{useState,useEffect} from 'react';
import kataService from '../services/kataService';
import SearchInput from '../components/SearchInput';
import Kata from '../components/Details Kata/Kata';
import Loading from '../assets/images/Logo/Loading.gif'


export default function Home() {

  const [initialKata,setInitialKata] = useState([])
  const [katas,setKatas] = useState([])
  const [searchKata,setSearchKata] = useState('')
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(false)

  useEffect(() => {
    getKatas()
  }, [])

  const getKatas = async () => {
    try {
      const response = await kataService.getKatas()
      setKatas(response)
      setLoading(false)
      setInitialKata(response)
    } catch (error) {
      setError(true)
    }
  }

  const handleSearch = (value) => {
    setSearchKata(value);
  }

  const handleLevels = (levels) => {
    const filtereslevels = [...initialKata].filter(key => {
      let result = 0
      levels.map(elem => result += key.level === elem ? 1:0)
      return result > 0})
      setKatas(filtereslevels)
  }

  const handleSortByLevel = (value) => {
    const sortByLevel = value ? [...katas].sort((a, b) => a.level - b.level):[...katas].sort((a, b) => a.level - b.level).reverse();
    setKatas(sortByLevel);
  }


  return (
    <div className='Home'>
    {loading && <div className='flex justify-center mt-20'><img width='10%' src={Loading} alt='loading'/></div>}
      {!loading && !error ?
        <div className="home">
          <div className="search_container mb-8 flex flex-wrap">
            <SearchInput handleSearchKata={handleSearch} handleLevels={handleLevels} handleSortByLevel={handleSortByLevel} />
          </div>
          <div className="card_container">
            {katas.filter(elem => elem.name.toLowerCase().includes(searchKata.toLowerCase())).length > 0 ? katas.filter(elem => elem.name.toLowerCase().includes(searchKata.toLowerCase())).map(elem => {
                return <Kata key={elem._id} kata={elem} />
              }): <div><h2 className='mx-6 text-center text-white'>No functions with that name or description have been found.</h2></div>}
          </div>
        </div>: error && <h3 className='mx-6 text-center text-white'>Sorry at the moment our website doesn't work correctly, we apologize for the inconvenience</h3>}
    </div>
  )
}
