import React from 'react'
import { FaBars } from 'react-icons/fa'
import { FiSearch } from "react-icons/fi";
import { MdOutlineLightMode, MdOutlineLogout } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { GoBell } from "react-icons/go";
import {useNavigate} from 'react-router-dom'
import SettingsModal from '../modal/SettingsModal';
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../../features/slice/toggleSlice';
import { addLogout } from '../../features/slice/userSlice';


const TopNavbar = ({setTheme,theme}) => {
  const {toggle} = useSelector(state => state.toggle)
  const {user} = useSelector((state) => state.user)    
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? 'dark' : "light")
  }

  return (
    <div className="flex justify-between flex-wrap  items-center h-full w-full px-6 ">
      <div className="md:flex hidden items-center  flex-wrap gap-4 ">
        <span className='cursor-pointer text-[18px]'>
           <FaBars/>
        </span>
        <form className='relative'>
          <input type="text" placeholder='Search'  className='border border-gray-300 py-1 px-8 outline-0 
           placeholder:font-semibold rounded '/>
           <span className='absolute top-[10px] left-[10px]' >
           <FiSearch/>
           </span>
        </form>

       </div>
        <div className="flex flex-wrap w-full md:w-fit justify-between items-center gap-4 text-gray-500 cursor-pointer">
           <div className='p-2 py-4' onClick={toggleTheme}>
             {
              theme === "light"  ? <MdOutlineLightMode/> :  <MdOutlineDarkMode/> 

             }
           </div>
           <div className='p-2 py-4'>
            <span onClick={() => dispatch(setToggle(1))}>
              <IoMdSettings/>
            </span>
            { toggle === 1 && (

            <div className='fixed top-0 left-0 bottom-0 right-0 w-full h-screen z-10
             justify-center bg-black/10 flex items-center'>
              <SettingsModal/>
            </div>
            )}
           </div>
           <div onClick={() => dispatch(setToggle(2))} className='relative p-2 py-4'>
            <span>
              <GoBell/>
            </span>
            {
              toggle === 2 && (
            <div className='absolute  z-50 top-[80%] right-[50%]'>
                <div className='bg-white border border-gray-300 border-gray-300 
                rounded lg:w-[300px] w-full'>
                  <div className='border-b border-gray-300  p-3'>
                  <p>Notifications</p>
                  <span className='text-sm'>You have 2 unread notifications</span>
                  </div>
                  
                   <ul className='flex flex-col '>
                     <li className='p-3 leading-2 hover:bg-gray-300/20'> 
                      <div className='flex justify-between items-center mb-1 '>
                        <p>Notifications</p>
                        <span className='text-xs'>{new Date().toLocaleDateString()}</span>
                      </div>
                        <div>
                          <span className='text-xs'>You have 2 unread notifications</span>
                        </div>
                     </li>
                   </ul>
                </div>
            </div>
              )
            }
           </div>
           <div className='py-4 relative'>
           <div className='h-6 w-6' onClick={() => dispatch(setToggle(3))}>
             <img src={user?.avatar} className='w-full h-full rounded-full' alt="" />
           </div>
           {toggle === 3 && (
           <div className="absolute top-[80%] z-50 right-[50%]">
                  <div className='bg-white  border border-gray-300 border-gray-300 
                rounded lg:w-[250px] w-full'>
                  <div className='border-b border-gray-300 leading-5 p-3'>
                  <p className='font-semibold md:text-[16px] text-sm'>{user?.name}</p>
                  <span className='text-sm'>{user?.email}</span>
                  </div>
                  
                   <ul className='flex flex-col '>
                     <li className='p-3 leading-2 hover:bg-gray-300/20 border-b border-gray-300 '> 
                      <div onClick={() => navigate('/settings')} className='flex items-center mb-1 gap-4 '>
                        <IoMdSettings/>
                        <p className='font-semibold'>Settings</p>
                        </div>
                     </li>
                     <li className='p-3 leading-2 hover:bg-gray-300/20'> 
                      <div className='flex items-center mb-1 gap-4' onClick={() => {
                        dispatch(addLogout()),
                        navigate('/')
                        }}>
                        <MdOutlineLogout/>
                        <p className='font-semibold'>Log out</p>
                        </div>
                     </li>
                   </ul>
                </div>
           </div>
           )}
           </div>
        </div>

      </div>


  )
}

export default TopNavbar