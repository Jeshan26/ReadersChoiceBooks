import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';

const RecentlyAdded = () => {
    const[Data, setData] = useState();
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get('http://localhost:1000/api/v1/get-recent-books');
            console.log(response);
        };
        fetch();
    }, []);
  return (
  <div className='mt-8 px-4'>
    <h4 className='text-3xl text-yellow-100'>Recently added books</h4>
  </div>
  );
};

export default RecentlyAdded