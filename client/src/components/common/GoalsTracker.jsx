import React from 'react'
import { FaRegCircleCheck } from "react-icons/fa6";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { MdOutlineWatchLater } from "react-icons/md";

const GoalsTracker = () => {
  return (
        <ul className="mt-6 flex gap-5 flex-col">
              <li className='border border-gray-200 p-5 bg-[#F5F9FD] rounded-[5px]'>
                  <div className="flex flex md:gap-6 gap-2 flex-wrap justify-between">
                      <div>
                          <h2>Increase Revenue by 20%
                            <span className='bg-[#0059B6] inline-block ml-2 text-[13px] text-white px-2   rounded'>Financial</span>
                          </h2>
                          <span className='text-gray-400 text-xs'>Finance Team • Due: Dec 31, 2025</span>
                      </div>
                      <div className=''>
                          <span className=' border border-[#37A0F4] items-center gap-1 inline-flex text-[#37A0F4]
                           font-semibold
                           text-xs px-2 py-1 rounded-[5px]'>  
                            <MdOutlineWatchLater  />
                           On Track

                           </span>
                      </div>
                  </div>
                  <div className='bg-[#F0F5FB] mt-2 w-full h-[7px] rounded relative'>
                      <span className='bg-[#00A37C] h-[7px] w-[75%] rounded absolute top-0'></span>
                  </div>
              </li>

              <li className='border border-gray-200 p-5 bg-[#F5F9FD] rounded-[5px]'>
                  <div className="flex flex md:gap-6 gap-2 flex-wrap  justify-between">
                      <div>
                          <h2>Reduce Customer Churn by 5%
                            <span className='bg-[#0059B6] inline-block ml-2 text-[13px] text-white px-2   rounded'>Customer</span>
                          </h2>
                          <span className='text-gray-400 text-xs'>Customer Success • Due: Oct 1, 2025</span>
                      </div>
                      <div className=''>
                          <span className=' border border-[#FEE685] text-[#BB5B16]  items-center gap-1 inline-flex text-[#37A0F4]
                           font-semibold
                           text-xs px-2 py-1 rounded-[5px]'>  
                            <HiOutlineExclamationTriangle className='text-[#FEE685]' />
                            At Risk
                           </span>
                      </div>
                  </div>
                  <div className='bg-[#FEF3C6] mt-2 w-full h-[7px] rounded relative'>
                      <span className='bg-[#00A37C] h-[7px] w-[35%] rounded absolute top-0'></span>
                  </div>
              </li>

              <li className='border border-gray-200 p-5 bg-[#F5F9FD] rounded-[5px]'>
                  <div className="flex md:gap-6 gap-2 flex-wrap  justify-between">
                      <div>
                          <h2>Implement New CRM System
                            <span className='bg-[#0059B6] inline-block ml-2 text-[13px]
                             text-white px-2   rounded'>Operations</span>
                          </h2>
                          <span className='text-gray-400 text-xs'>IT Department • Due: Jun 30, 2025</span>
                      </div>
                      <div className=''>
                          <span className=' border border-[#B9F8CF] text-[#278236] items-center gap-1 inline-flex
                           text-[#37A0F4]
                           font-semibold
                           text-xs px-2 py-1 rounded-[5px]'>  
                            <MdOutlineWatchLater  />
                           Completed
                           </span>
                      </div>
                  </div>
                  <div className='bg-[#F0F5FB] mt-2 w-full h-[7px] rounded relative'>
                      <span className='bg-[#00A37C] h-[7px] w-[75%] rounded absolute top-0'></span>
                  </div>
              </li>

       
        </ul>
  )
}

export default GoalsTracker