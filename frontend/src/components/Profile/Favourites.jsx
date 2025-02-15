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
      const response = await axios.get("http://localhost:1000/api/v1/get-favorite-books",
      { headers } 
    );
    setFavouriteBooks(response.data.data);
    };
    fetch(); 
  }, [FavouriteBooks])
  

  return (
    <div className='grid grid-cols-4 gap-4'>
      {FavouriteBooks && 
      FavouriteBooks.map((items,i) => (
      <div key={i}>
        <BookCard data={items} favourite = {true} />
        </div>

      )) }

    </div>
  )
};

export default Favourites