import React from 'react'

import { BsEnvelope } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { LuMessageSquare } from "react-icons/lu";
import { useDispatch } from 'react-redux';
import { setToggle } from '../../features/slice/toggleSlice';


const UserDetails = ({member}) => {
      const dispatch = useDispatch()
  
  return (
    <>
      <div className="mt-6">
        <ul className='flex space-y-2 flex-col'>
          <li className='flex gap-4 items-center '>
            <span className='text-gray-400'>
              <BsEnvelope />
            </span>
            <div>
              <p>Email</p>
              <span className='text-gray-400'> {member?.email}</span>
            </div>
          </li>
          <li className='flex gap-4 items-center '>
            <span className='text-gray-400'>
              <FiPhone />
            </span>
            <div>
              <p>Phone</p>
              <span className='text-gray-400'> {member?.email}</span>
            </div>
          </li>
          <li className='flex gap-4 items-center'>
            <span className='text-gray-400'><CiLocationOn /></span>
            <div>
              <p>Location</p>
              <span className='text-gray-400'> {member?.email}</span>
            </div>
          </li>
          <li className='flex gap-4 items-center '>
            <span className='text-gray-400'>
              <CiCalendar />
            </span>
            <div>

              <p>Joined</p>
              <span className='text-gray-400'> {member?.email}</span>
            </div>
          </li>
        </ul>
      </div>
      <div className='mt-6'>
        <p>Bio</p>
        <span className='text-gray-400'>Visual designer with a strong background in branding and identity design.</span>
      </div>
      <div className='mt-6'>
        <div className='flex justify-between items-center'>
          <button  onClick={() => dispatch(setToggle(7))} className='border border-gray-400 rounded cursor-pointer px-4  hover:bg-cyan-50 py-1'>Close</button>
          <div className='flex gap-2 items-center'>
            <button className='border hover:bg-cyan-50 flex gap-2 items-center border-gray-400 rounded cursor-pointer px-4 py-1'>
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
    </>
  )
}

export default UserDetails