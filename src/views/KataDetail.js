import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import kataService from '../services/kataService';

export default function KataDetail() {
  const { kataId } = useParams();
  const [kata, setkata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getKata = async () => {
    try {
      const response = await kataService.getOneKata(kataId);
      setLoading(false);
      setkata(response);
      setError(false);
      console.log(response);
    } catch (error) {
      console.error(error)
      setLoading(false);
    }
  }

  useEffect(() => {
    getKata();
    // eslint-disable-next-line
  }, [kataId])

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && kata && 
      <div className="card">
      <h3>{kata.name}</h3>
      <div dangerouslySetInnerHTML={{__html: kata.instructions}}></div>
      <button className="btn" style={{ marginLeft: '10px' }}><Link to={`/kata/practise/${kata._id}`}>Start</Link></button>
    </div>}
      {error && <p>Something went wrong. Couldn't find your kata</p>}
    </div>
  )
}