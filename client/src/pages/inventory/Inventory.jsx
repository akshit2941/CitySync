import React from 'react'
import {Navbar, FilterSection, SearchBar, InventoryData} from '.';

const Inventory = () => {
  return (
    <div className='min-h-screen bg-gray-100 min-w-screen'>
      <header>
        <Navbar />
      </header>
      <div className='flex flex-row px-20 py-4 w-full items-start'>
      {/* filtes */}
      <FilterSection/>
      {/* main */}
      <div className='w-4/5 flex flex-col'>
      <SearchBar/>
      <InventoryData/>
      </div>
      
      </div>
    </div>
  )
}

export default Inventory
