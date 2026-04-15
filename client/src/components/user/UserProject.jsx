import React from 'react'
import { FiUser } from 'react-icons/fi';
import { IoBagOutline } from "react-icons/io5";
import { LuMessageSquare } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { setToggle } from '../../features/slice/toggleSlice';

const UserProject = () => {
  const dispatch = useDispatch()    
    return (
        <div className='mt-6'>
            <div className='border border-gray-300  p-3 rounded'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-4 items-center'>
                        <span className='text-indigo-500'><IoBagOutline size={24} /></span>
                        <div>
                            <p >Mobile App</p>
                            <span className='text-gray-500 text-sm'>Active Projext</span>
                        </div>
                    </div>
                    <button className='border border-gray-300 rounded px-3 py-1'>View</button>
                </div>
            </div>
            <div className='border border-gray-300  p-3 rounded  mt-3'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-4 items-center'>
                        <span className='text-indigo-500'><IoBagOutline size={24} /></span>
                        <div>
                            <p>App Integration</p>
                            <span className='text-gray-500 text-sm'>Active Projext</span>
                        </div>
                    </div>
                    <button  className='border border-gray-300 rounded px-3 py-1'>View</button>
                </div>
            </div>
            <div className='mt-3'>
                <div className='flex justify-between items-center'>
                    <button onClick={() => dispatch(setToggle(7))} className='border border-gray-400 rounded 
                    cursor-pointer px-4  hover:bg-cyan-50 py-1'>Close</button>
                    <div className='flex gap-2 items-center'>
                        <button  className='border hover:bg-cyan-50 flex gap-2 items-center border-gray-400 rounded cursor-pointer px-4 py-1'>
                            <FiUser />
                            View Profile
                        </button>
                        <button className=' flex items-center cursor-pointer text-white gap-2 rounded cursor-pointer px-4 py-1 bg-[#00A37C]'>
                            <LuMessageSquare />
                            Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProject