import React from 'react'
import { FaRegCircleCheck } from "react-icons/fa6";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaRegCircleXmark } from "react-icons/fa6";



const ProjectStatus = () => {
  return (
    <ul className="mt-6 flex gap-5 flex-col">
          <li className='border border-gray-200 p-5 rounded-[5px]'>
              <div className="flex flex-wrap gap-6">
                  <span className='w-[40px] h-[40px] flex items-center  justify-center bg-[#DBFCE7] 
                rounded-full flex items-center text-[#00A63E]'>
                      <FaRegCircleCheck size={20} />
                  </span>
                  <div>
                      <h2>Website Design</h2>
                      <span className='text-gray-400 text-xs'>65% Complete</span>
                  </div>
                  <div className='mr-auto'>
                      <span className='bg-[#DBFCE7] text-[#00A63E] font-semibold text-xs px-2 py-1 rounded-[5px]'>On Track</span>

                      <p className='text-gray-400 flex items-center mt-2 text-sm'>
                          <span><MdOutlineWatchLater /></span>
                          Jun 15
                      </p>
                  </div>
              </div>
              <div className='bg-[#F0F5FB] mt-2 w-full h-[7px] rounded relative'>
                  <span className='bg-[#00C950] h-[7px] w-[75%] rounded absolute top-0'></span>
              </div>
          </li>
          <li className='border border-gray-200 p-5 rounded-[5px]'>
              <div className="flex flex-wrap gap-6">
                  <span className='w-[40px] h-[40px] flex items-center  justify-center bg-[#FEF3C6] 
                rounded-full flex items-center text-[#E58119]'>
                      <HiOutlineExclamationTriangle size={20} />
                  </span>
                  <div>
                      <h2>Website Design</h2>
                      <span className='text-gray-400 text-xs'>
                          42% Complete</span>
                  </div>
                  <div className='mr-auto'>
                      <span className='bg-[#FEF3C6] text-[#E58119] font-semibold text-xs px-2 py-1 rounded-[5px]'>At Risk</span>

                      <p className='text-gray-400 flex items-center mt-2 text-sm'>
                          <span><MdOutlineWatchLater /></span>
                          Jun 10
                      </p>
                  </div>
              </div>
              <div className='bg-[#F0F5FB] mt-2 w-full h-[7px] rounded relative'>
                  <span className='bg-[#FE9A00] h-[8px] w-[45%] rounded absolute top-0'></span>
              </div>
          </li>
          <li className='border border-gray-200 p-5 rounded-[5px]'>
              <div className="flex flex-wrap gap-6">
                  <span className='w-[40px] h-[40px] flex items-center  justify-center bg-[#DBEAFE] 
                rounded-full flex items-center text-[#155DFC]'>
                      <FaRegCircleCheck size={20} />
                  </span>
                  <div>
                      <h2>Marketing Task</h2>
                      <span className='text-gray-400 text-xs'>100% Complete</span>
                  </div>
                  <div className='mr-auto'>
                      <span className='bg-[#DBEAFE] text-[#155DFC] font-semibold text-xs px-2 py-1 rounded-[5px]'>
                          Completed</span>
                      <p className='text-gray-400 flex items-center mt-2 text-sm'>
                          <span><MdOutlineWatchLater /></span>
                          May 30
                      </p>
                  </div>
              </div>
              <div className='bg-[#F0F5FB] mt-2 w-full h-[7px] rounded relative'>
                  <span className='bg-[#2B7FFF] h-[7px] w-[100%] rounded absolute top-0'></span>
              </div>
         </li>
   
    </ul>
  )
}

export default ProjectStatus