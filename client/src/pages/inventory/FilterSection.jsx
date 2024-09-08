import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faRotateRight } from '@fortawesome/free-solid-svg-icons';

const FilterSection = () => {
  return (
    <div className='flex flex-col space-y-4 w-1/4 h-[87vh]'>
      <div className='h-10 flex flex-row space-x-9 items-end'>
        <h1 className='text-3xl font-semibold'>Items</h1>
        <div className='border border-gray-300 rounded-lg p-0.5'>
          <p className='text-xs p-0.5'>1800 total items</p>
        </div>
      </div>
      <div className='flex flex-col bg-white shadow-lg px-2 py-2 rounded-md h-full'>
        <div className='flex flex-col flex-grow'>
          <p className='text-xs font-light pb-1'>ITEM TYPE</p>
          <div className='flex flex-wrap gap-2 w-full'>
            {['All', 'Technical', 'HR', 'Digital'].map((category, index) => (
              <button type='button' key={index} className='flex w-[48%] shadow-lg border border-gray-200 items-center rounded-lg justify-between p-2 hover:scale-105 transition-transform transform duration-300 ease-in-out'>
                <p className='text-xs font-semibold'>{category}</p>
                <div className='bg-gray-100 text-xs rounded-md p-0.5'>
                  <p>{[1800, 500, 700, 600][index]}</p>
                </div>
              </button>
            ))}
          </div>
          <p className='text-xs font-light pb-1 pt-4'>ITEM STATUS</p>
          <div className='flex flex-wrap gap-2 w-full'>
            {['Rent', 'Used'].map((category, index) => (
              <button type='button' key={index} className='flex w-[48%] border shadow-lg items-center rounded-lg justify-between border-gray-200 p-2 hover:scale-105 transition-transform transform duration-300 ease-in-out'>
                <p className='text-xs font-semibold'>{category}</p>
                <div className='bg-gray-100 text-xs rounded-md p-0.5'>
                  <p>{[1000, 800][index]}</p>
                </div>
              </button>
            ))}
          </div>
          <p className='text-xs font-light pb-1 pt-4'>SORT BY</p>
          <div className='border border-gray-200 rounded-lg p-2 shadow-lg flex flex-row gap-2 items-center hover:scale-105 transform transition-transform duration-300 ease-in-out'>
            <FontAwesomeIcon icon={faSort} />
            <select name="Sort" id="" className='outline-none border-none text-sm font-medium w-full'>
              <option value="Ascending">Alphabetical: A-Z</option>
              <option value="Descending">Alphabetical: Z-A</option>
              <option value="Quantity">Quantity</option>
              <option value="Popularity">Popularity</option>
            </select>
          </div>
          <p className='text-xs font-light pb-1 pt-4'>Commonly Used</p>
          <div className='flex flex-wrap gap-2 w-full'>
            {['Cranes', 'Fire Truck', 'JCB', 'Computers', 'Drones', 'Scanners', 'Electrician', 'Cement', 'Coal Tar', 'Drill Machine'].map((category, index) => (
              <button type='button' key={index} className='flex w-[48%] border shadow-lg items-center rounded-lg justify-between border-gray-200 p-2 hover:scale-105 transition-transform transform duration-300 ease-in-out'>
                <p className='text-xs font-semibold'>{category}</p>
                <div className='bg-gray-100 text-xs rounded-md p-0.5'>
                  <p>{[20, 30, 40, 5, 10, 30, 50, 30, 20, 10][index]}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className='mt-auto flex justify-end items-end'>
          <button type='button' className='flex items-center justify-center gap-2 h-10 w-full bg-blue-500 rounded-lg text-white hover:scale-105 transition-transform transform duration-300 ease-in-out shadow-lg'>
            <FontAwesomeIcon icon={faRotateRight} />
            <p>Reset Filters</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterSection;
