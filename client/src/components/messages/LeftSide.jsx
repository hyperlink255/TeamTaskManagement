import React from 'react'
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";




const LeftSide = () => {
  return (
    <div className='bg-white border border-gray-300 rounded-xl'>
    <div className='border-b border-gray-300 p-5'>
      <div className="flex items-center justify-between">
         <h2 className='font-semibold text-[18px] '>Conversations</h2>
         <span>
          <FaPlus/>
         </span>
      </div>
         <div className='mt-5 relative'>
          <input type="text" placeholder='Search messages...' className='border border-gray-300 
          rounded-[5px] py-1 w-full px-8 outline-0 text-black'/>
          <span className='absolute text-gray-400 top-[10px] left-[11px]'>
            <CiSearch />
          </span>
         </div>
         <div className='bg-[#F1F7FB] rounded-[5px] py-2 px-1 mt-5'> 
          <ul className='flex items-center justify-between'>
           {
             ["All","Direct","Groups"].map((item,i) => (
              <li className='text-sm  py-1 w-[94px] cursor-pointer
               shadow-md px-2 rounded-[8px] flex items-center justify-center gap-2 text-center'>
                <span>
                  { i !== 0 &&  i === 1 && <FiUser/> || i === 2 && <FiUsers/>}
                </span>
                {item}
              </li>
             ))
           }
          </ul>

         </div>       
    </div>
    <div className='h-[calc(390px-20px)] mt-5 overflow-y-auto p-3'>
      {Array.from({ length: 30 }).map((_, index) => (
        <div
          key={index}
          className='p-3 mb-2 bg-gray-100 rounded-lg hover:bg-blue-100 cursor-pointer transition'
        >
          <div className='flex  justify-between'>

          <div className='flex items-center gap-4'> 
            <div className='relative'>
              <img src="https://taskify-next-admin.vercel.app/images/users/1.jpg"
               className='w-[40px] h-[40px] rounded-full' alt="" />
               <span className='bg-[#00C950] absolute w-[8px] h-[8px]  border-2 p-1 border-white
                -right-[3px]  bottom-[3px]  rounded-full'></span>
            </div>
            <div>
              <p>Team Jhon</p>
              <span className='text-sm block text-gray-400'>Meetings notes yesterday</span>
              <span className='text-sm block text-gray-400'>3 / 8 online</span>
            </div>
          </div>
          <span className='text-gray-400 text-sm'>10:45</span>
          </div>

        </div>
      ))}

    </div>
    </div>
  )
}

export default LeftSide