import React from 'react'
import { IoPaperPlaneOutline } from "react-icons/io5";

const RightSide = () => {
  return (

    <div className='border border-gray-300 rounded-xl  bg-white'>
     <div className='border-b border-gray-300 p-4'>
        <div className='flex gap-4 leading-4 items-center'>
          <div>
            <img src="https://taskify-next-admin.vercel.app/images/users/6.jpg" className='w-[40px] h-[40px] 
            rounded-full' alt="" />
          </div> 
          <div className='mt-1'>
            <p>
                Tech Support
            </p>
            <span className='text-xs'>Online</span>
          </div>
        </div>
     </div>
     <div className=' p-4 h-[calc(450px-20px)] 
    overflow-y-auto'>
      {Array.from({ length: 40 }).map((_, index) => (
        <>
        <div className='flex gap-2'> 

        <div>
          {index % 2 === 0 && (
            
          <img src="https://taskify-next-admin.vercel.app/images/users/1.jpg"
           className='w-[30px] h-[30px] rounded-full' alt="" />
          )}
        </div>
        <div
          key={index}
          className={`max-w-[70%] p-3 mb-3 rounded-lg ${
            index % 2 !== 0
              ? "bg-blue-500 text-white ml-auto"
              : "bg-gray-200"
          }`}
        >
        Message sadasdsad {index + 1}
        </div>
        </div>
        </>
      ))}

    </div>

     <div className='border-t border-gray-300 p-4'>
        <form>
            <div className='flex gap-2'>
            <input type="text" placeholder='Type a messages' className='outline-0 border focus:outline-none focus:shadow-[0_0_4px_#00A37C]
                border-gray-300 rounded-[5px] px-4 py-1 w-full'   />
                <button className='bg-[#00A37C] w-[45px] cursor-pointer h-[40px] flex items-center justify-center rounded-[10px] text-white'>
                    <IoPaperPlaneOutline size={20}/>
                </button>
            </div>
        </form>
     </div>


    </div>
  )
}

export default RightSide