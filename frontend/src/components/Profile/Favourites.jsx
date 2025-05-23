import React, { useState } from 'react'
import { useEffect } from 'react';
import BookCard from "../BookCard/BookCard";

import axios from "axios";

const Favourites = () => {

  const [FavouriteBooks, setFavouriteBooks] = useState();

  const headers = {
    id : localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const fetch = async ()=>{
      const response = await axios.get(`${import.meta.env.VITE_API_URL_DEV}/api/v1/get-favorite-books`,
      { headers } 
    );
    setFavouriteBooks(response.data.data);
    };
    fetch(); 
  }, [FavouriteBooks])
  

  return (
    <>
    {FavouriteBooks && FavouriteBooks.length === 0 && (
      <div className='text-5xl font-semibold text-zinc-500 flex items-center justify-center w-full h-[100%]'>No Favorite Books</div>
    )}
    
    <div className='grid grid-cols-4 gap-4 '>
      
      {FavouriteBooks && 
      FavouriteBooks.map((items,i) => (
      <div key={i}>
        <BookCard data={items} favourite = {true} />
        </div>

      ))}
    </div>
    </>
  )
};

export default Favourites