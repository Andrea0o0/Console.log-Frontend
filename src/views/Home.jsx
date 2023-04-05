import React,{useState,useEffect} from 'react';
import kataService from '../services/kataService';
import SearchInput from '../components/SearchInput';
import Kata from '../components/Kata';


export default function Home() {

  const [katas,setKatas] = useState([])
  const [searchKata,setSearchKata] = useState('')
  const [loading, setLoading] = useState(true);

  const getKatas = async () => {
    try {
      const response = await kataService.getKatas()
      setKatas(response)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getKatas()
    
  }, [])

  const handleSearch = (value) => {
    setSearchKata(value);
  }

  


  return (
    <div>
    {loading && <p>Loading...</p>}
      {!loading &&
        <div className="home">
          <div className="search_container">
            <SearchInput handleSearchKata={handleSearch} />
          </div>
          <div className="card_container">
            {katas.filter(elem => elem.name.toLowerCase().includes(searchKata.toLowerCase()))
              .map(elem => {
                return <Kata key={elem._id} kata={elem} />
              })}
          </div>
        </div>}
    </div>
  )
}
