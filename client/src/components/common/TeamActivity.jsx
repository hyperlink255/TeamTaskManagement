import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { api } from '../../services/axiosIntance'

const TeamActivity = () => {
  const [user,setUser] = useState([])

  useEffect(() => {
      const handleUserData = async () => {
        try{
          const res = await api.get('/api/users/all')
          if(res.status === 200){
            setUser(res.data.user)
          }
        }catch(error){
          toast.error(error.message)
        }
      }
      handleUserData()
  },[])
  
  
  return (
    <ul className='mt-6 flex flex-col gap-4'>
      {
        user.map((item,i) => (
          <li className='flex gap-2 hover:bg-[#c3e7ed2c] rounded-[5px] cursor-pointer p-2' key={i}>
            <img src={item.avatar} alt="" className='w-[50px] h-[50px] rounded-[10px]' />
            <div>
              <p>{item.name} <span className='text-gray-400'>completedTasks</span></p>
              <span className='text-gray-400 text-xs'>2 hours</span>
            </div>
          </li>
        ))
      }
    </ul>
  )
}

export default TeamActivity