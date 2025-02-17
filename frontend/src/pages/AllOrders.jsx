import React, { useEffect } from 'react'
import axios from "axios";


const AllOrder = () => {

  const headers = {
    id : localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const fetch = async ()=>{
      const response = await axios.get("http://localhost:1000/api/v1/all-orders",
        { headers }
      );
      console.log(response.data.orders);
    };
    fetch();
  },[])

  return (
    <div>
      All Orders
    </div>
  )
}

export default AllOrder
