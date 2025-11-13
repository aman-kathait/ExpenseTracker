import React from 'react'
import { useState } from 'react';
import SideMenu from './SideMenu';
const Navbar = ({activeMenu}) => {
    const [openSideMenu,setOpenSideMenu]=useState(false);
  return (
    <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
        <button className='block lg:hidden text-black' onClick={()=>setOpenSideMenu(!openSideMenu)}>
            {openSideMenu ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            )}
        </button>
    <h2 className='text-lg font-semibold text-black'>Expense Tracker</h2>

    {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
            <SideMenu activeMenu={activeMenu} />
        </div>
    )}
    </div>
  )
}

export default Navbar;