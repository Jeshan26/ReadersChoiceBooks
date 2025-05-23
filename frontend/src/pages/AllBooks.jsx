import React,  { useEffect,useState } from 'react'
import axios from "axios";

import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'

function AllBooks() {

  const[Data, setData] = useState();
  useEffect(() => {
      const fetch = async () => {
        // The backend axios was accepting authorization for below URI 
        // but this should be public URI so i made this below api a public api(backend) instead of authorized because this is visible at home page without any kind of authorization.
          const response = await axios.get(`${import.meta.env.VITE_API_URL_DEV}/api/v1/get-all-books`);
          setData(response.data.books);
      };
      fetch();
  }, []);

  return (
    <div className='min-h-screen bg-zinc-900 h-auto px-12 py-8'>
      <h4 className='text-3xl text-yellow-100'>All books</h4>
    {!Data && (
      <div className='w-full h-screen flex items-center justify-center'> <Loader /></div>
    )}
    <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
    
      {Data && Data.map((items,i) => 
      <div key={i}>
        <BookCard data={items} />{' '}
      </div>)}
    </div>
    </div>
  )
}

export default AllBooks