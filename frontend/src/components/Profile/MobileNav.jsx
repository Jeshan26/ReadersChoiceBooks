import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MobileNav = () => {

  const role = useSelector((state) => state.auth.role);
  return (
    <>
      {role === "user" && (
        <div className='lg:hidden w-full flex items-center justify-between mt-4'>
        <Link
            to="/profile"
            className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
            Favourites
        </Link>
        <Link
            to="/profile/orderHistry"
            className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
            Order Histry
        </Link>
        <Link
            to="/profile/settings"
            className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
            Settings
        </Link>
    </div>
      )}

{role === "admin" && (
        <div className='lg:hidden w-full flex items-center justify-between mt-4'>
        <Link
            to="/profile"
            className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
            All orders
        </Link>
        <Link
            to="/profile/add-book"
            className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
            Add book
        </Link>
    </div>
      )}
    </>
  )
}

export default MobileNav