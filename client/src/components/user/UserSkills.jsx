import React from 'react'
import { FiUser } from 'react-icons/fi'
import { LuMessageSquare } from 'react-icons/lu'
import { useDispatch } from 'react-redux'
import { setToggle } from '../../features/slice/toggleSlice'

const UserSkills = ({ member }) => {
    const dispatch = useDispatch()
    return (
        <div className='mt-6'>
            <div className='flex gap-2 items-center'>
                {member.skills.map((skill,i) => 
                <span key={i} className='bg-[#0059B6] rounded-[5px] py-[4px] text-sm text-white px-5'>{skill}</span>
                )}
            </div>
            <div className='mt-6'>
                <h4>Expertise Areas</h4>
                <div className='mt-2'>
                    <div className='mb-2'>
                    <div className='flex justify-between'>
                    <p className='text-gray-600 mb-1'>Content Marketing</p>
                    <span>75%</span>
                    </div>
                    <div className='bg-[#E1EDF8] w-full h-[8px] rounded-2xl relative'>
                        <span className='w-[75%] bg-[#00A37C] absolute top-0 rounded-2xl inline-block h-[8px]'></span>
                    </div>
                    </div>
                  <div className='mb-2'>
                     <div className='flex justify-between'>
                    <p className='text-gray-600 mb-1'>PPC</p>
                    <span>73%</span>
                    </div>
                     <div className='bg-[#E1EDF8] w-full h-[8px] rounded-2xl relative'>
                        <span className='w-[73%] bg-[#00A37C] absolute top-0 rounded-2xl inline-block h-[8px]'></span>
                    </div>
                    </div>
                    <div className='mb-2'>
                   <div className='flex justify-between'>
                    <p className='text-gray-600 mb-1'>Market Research</p>
                    <span>98%</span>
                    </div>
                    <p className='text-gray-600 mb-1'></p>
                      <div className='bg-[#E1EDF8] w-full h-[8px] rounded-2xl relative'>
                        <span className='w-[98%] bg-[#00A37C] absolute top-0 rounded-2xl inline-block h-[8px]'></span>
                    </div>
                  </div>
               </div>
            </div>
                  <div className='mt-4'>
                    <div className='flex justify-between items-center'>
                      <button onClick={() => dispatch(setToggle(7))} className='border border-gray-400 rounded cursor-pointer 
                      px-4  hover:bg-cyan-50 py-1'>Close</button>
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

export default UserSkills