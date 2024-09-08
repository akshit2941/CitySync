import React from 'react'

const SearchBar = () => {
return (
    <div className='flex flex-row w-full'>
    <div className='flex h-10 w-full items-end space-x-2 rounded-lg px-2'>
    <input
        type="text"
        placeholder="Search..."
        className="flex-1 p-2 border-none outline-none rounded-lg shadow-lg"
    />
    <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 hover:scale-105 transition-transform duration-300 ease-in-out"
    >
        Search
    </button>
    </div>
    <div className=' h-10 justify-end items-end w-1/3 flex flex-col'>
      <button type='button' className='bg-green-500 w-1/2 p-2 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out'>
        Add Items
      </button>
      </div>
    </div>
)
}

export default SearchBar
