import React from 'react'
import { FaXmark } from "react-icons/fa6";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../../features/slice/toggleSlice';

const primaryColor = [
    "#11B989","#F6339A","#2B7FFF","#00C950","#FB2C36"
]

const SettingsModal = () => {
    const dispatch = useDispatch()      
    return (
        <div className='bg-white lg:w-[360px] w-full p-4 rounded'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='font-semibold text-gray-800'>Appearance</h2>
                <span onClick={() => dispatch(setToggle(1))}>
                <FaXmark />
                </span>
            </div>
            <div className='py-4 text-gray-800 space-y-4'>
                <span className='mb-2 inline-block font-semibold'>Theme</span>
                <div className="grid grid-cols-3  items-center gap-2">
                    <label htmlFor="" className='flex gap-2 items-center text-gray-900 justify-center border py-1 rounded border-gray-300'>
                        <span>
                            <MdOutlineLightMode />
                        </span>
                        Light
                    </label>
                    <label htmlFor="" className='flex gap-2 items-center text-gray-900 justify-center border py-1 rounded border-gray-300'>
                        <span>
                            <MdOutlineDarkMode />
                        </span>
                        Dark
                    </label>
                    <label htmlFor="" className='flex gap-2 text-gray-900  items-center justify-center border py-1 rounded border-gray-300'>
                        <span>
                            < FaDesktop/>
                        </span>
                        System
                    </label>
                </div>
            </div>
            <div className='py-4 space-y-4'>
                <span className='mb-2 inline-block font-semibold'>Primary</span>
                <div className='flex items-center gap-2'>
                    {
                        primaryColor.map((item) => {
                            return (
                                <button style={{background:item}} className='w-[40px] h-[40px] cursor-pointer rounded-full'/>
                            )
                        })
                    }
                </div>
            </div>
            <div className='py-4 space-y-4'>
                <button className='border border-gray-300 w-full py-1 text-center cursor-pointer transition-all duration-200 hover:bg-cyan-50 rounded'>Close</button>
            </div>
        </div>
    )
}

export default SettingsModal