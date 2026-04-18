import React, { useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { MdLogout } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { FiLinkedin } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import toast from 'react-hot-toast';
import { api } from '../../services/axiosIntance';
import { useDispatch, useSelector } from 'react-redux';
import { addName } from '../../features/slice/userSlice';
const Settings = () => {
  
  const [update,setUpdate] = useState({
    name : "",
    image:null
  })
  const dispatch = useDispatch()
  

  const handleUpdate = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', update.name)
    formData.append('image', update.image)
    try{
       const res = await api.put('/api/users/update',formData)
       if(res.status === 200) {
        toast.success(res.data.message)
        dispatch(addName(res.data.user))
        
       }
    }catch(error){
      toast.error(error.message)
    }
  }
  return (
    <>
      <div className='font-bold mb-4 text-3xl'>
        Settings

      </div>
      <div className="border border-gray-300 p-6 text-gray-800 w-full md:w-[800px] rounded bg-white shadow">
        <form action="" onSubmit={handleUpdate}>
          <div className='flex items-center md:flex-nowrap flex-wrap gap-5'>
            <div className='md:w-1/5 w-full'>
              <img src={update.image ? URL.createObjectURL(update.image) : 'https://taskify-next-admin.vercel.app/images/users/1.jpg'} className='w-full border-cyan-100/50 rounded border-4 rounded' alt="" />
              <label htmlFor='image' className='border border-gray-300 py-1 cursor-pointer px-2 text-sm 
             rounded mt-3  items-center  gap-2 inline-flex'>
                <input type="file" name="image"
                 onChange={(e) => setUpdate((prev) => ({...prev, image : e.target.files[0]}))}
                  className='hidden' id="image" accept='image/*'  />
                <span className='transform -rotate-[90deg]'><MdLogout /></span>
                Change Logo
              </label>
            </div>
            <div className='md:w-4/5 w-full '>
              <div className='flex md:flex-nowrap flex-wrap md:gap-3 gap-0 items-center'>
                <div className='w-full mb-3'>
                  <label htmlFor="name" className='block mb-3'>Name</label>
                  <input type="text" name="name" value={update.name} 
                  onChange={(e) => setUpdate((prev) => ({...prev, [e.target.name] : e.target.value}))} defaultValue="Sadasdsda" className='outline-0 w-full py-1 px-5 rounded border border-gray-300' />
                </div>
                <div className='w-full mb-3'>
                  <label htmlFor="name" className='block mb-3'>Domain</label>
                  <input type="text" defaultValue="acme.com" className='outline-0 py-1 w-full px-5 rounded border border-gray-300' />
                </div>
              </div>
              <div>
                <label htmlFor="description" className='block mb-2'>Description</label>
                <textarea defaultValue="Acme Inc. is a leading provider of innovative solutions for businesses of all sizes." className='w-full border border-gray-300 rounded py-1 px-5' rows={3} />
              </div>
            </div>

          </div>
          <div className='mt-5'>
            <h2 className='text-xl mt-3'>Contact Information</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-5">
              <div className='mt-3'>
                <label htmlFor="email" className='inline-block mb-2' >Email</label>
                <input defaultValue="contact@acme.com" type="email" className='outline-0 w-full  py-1 px-5 rounded border border-gray-300' />
              </div>
              <div className='mt-3'>
                <label htmlFor="email" className='inline-block mb-2' >Phone</label>
                <input type="text" defaultValue="+1 (555) 123-4567" className='outline-0 w-full  py-1 px-5 rounded border border-gray-300' />
              </div>
              <div className='mt-3 relative'>
                <label htmlFor="email" className='inline-block mb-2' >Website</label>
                <input defaultValue="https://acme.com" type="name" className='outline-0 w-full px-12 py-1  rounded border border-gray-300' />
                <span className='absolute left-0 bg-[#E1EDF8] py-2 px-3 top-[50%]  rounded-[4px_0_0_4px]'>
                  <CiGlobe />
                </span>
              </div>
            </div>

          </div>
          <div className='mt-5'>
            <h2 className='text-xl mt-3'>Social Profiles</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-5">
              <div className='mt-3 relative'>
                <label htmlFor="email" className='inline-block mb-2' >Twitter</label>
                <input defaultValue="@acmeinc" type="name" className='outline-0 w-full px-12 py-1  rounded border border-gray-300' />
                <span className='absolute text-gray-500 left-0 bg-[#E1EDF8] py-2 px-3 top-[50%]  rounded-[4px_0_0_4px]'>
                  <CiTwitter />
                </span>
              </div>
              <div className='mt-3 relative'>
                <label htmlFor="email" className='inline-block mb-2' >Linkedin</label>
                <input defaultValue="acme-inc" type="name" className='outline-0 w-full px-12 py-1  rounded border border-gray-300' />
                <span className='absolute left-0 bg-[#E1EDF8] text-gray-500 py-2 px-3 top-[50%]  rounded-[4px_0_0_4px]'>
                  <FiLinkedin />
                </span>
              </div>
              <div className='mt-3 relative'>
                <label htmlFor="email" className='inline-block mb-2' >FaceBook</label>
                <input defaultValue="acmeinc" type="name" className='outline-0 w-full px-12 py-1  rounded border border-gray-300' />
                <span className='absolute left-0 bg-[#E1EDF8] text-gray-500 py-2 px-3 top-[50%]  rounded-[4px_0_0_4px]'>
                  <FiFacebook />
                </span>
              </div>
              <div className='mt-3 relative'>
                <label htmlFor="name" className='inline-block mb-2' >Instagram</label>
                <input defaultValue="acmeinc" type="name" className='outline-0 w-full px-12 py-1  rounded border border-gray-300' />
                <span className='absolute left-0 bg-[#E1EDF8] text-gray-500 py-2 px-3 top-[50%]  rounded-[4px_0_0_4px]'>
                  <FaInstagram />
                </span>
              </div>
            </div>
              <div className='mt-6 flex justify-end items-end '>
                <button type="submit" className='bg-indigo-500 py-1 px-5 text-white cursor-pointer rounded'>Save Changes</button>
              </div>

          </div>
        </form>

      </div>
    </>

  )
}

export default Settings