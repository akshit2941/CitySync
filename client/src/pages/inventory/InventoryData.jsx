import React from 'react';


const InventoryData = () => {
    const imageList = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvZwCjQc-R6TnL5Xarq__8IdgQsnLen2A-IA&s','https://www.piercemfg.com/hs-fs/hubfs/Blog/What%20is%20a%20Quint%20Fire%20Truck/Banner-pierce-quint-fire-truck-image.jpg?width=1720&name=Banner-pierce-quint-fire-truck-image.jpg','https://media.gcflearnfree.org/content/55e0730c7dd48174331f5164_01_17_2014/whatisacomputer_pc.jpg'];

  return (
    <div className='pl-2 py-4'>
      <div className='flex flex-wrap gap-2 w-full'>
          {['Cranes', 'FireTruck','Computers'
          ].map((category, index) => (
            <div  key={index} className='bg-white flex w-full border shadow-lg items-center rounded-lg justify-between border-gray-200 p-2 '>
              <img src={imageList[index]} alt={category} className='rounded-lg w-28 h-20 shadow-lg' />
              <div className='flex flex-col w-full gap-1 pl-2 '>
              <p className='text-lg font-bold'>{category}</p>
              <div className='text-sm font-normal flex flex-row gap-2'>
                <p>Quantity: {[20,30,10][index]}</p>
                <p>Item Type: {['Machinery','Vehicle','Digital'][index]}</p>
              </div>
              </div>
              <button className='bg-green-500 w-1/5 p-2 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out'>
                Request
              </button>
              <div className='px-2'></div>
              <button className='bg-blue-500 w-1/5 p-2 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out'>
                Update Stock
              </button>
            </div>
          ))}
        </div>
    </div>
  )
}

export default InventoryData
