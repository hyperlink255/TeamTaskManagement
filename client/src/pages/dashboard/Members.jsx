import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { useDispatch, useSelector } from 'react-redux'
import { deleteHandleMember } from '../../features/slice/memberSlice'
import { FiUser } from "react-icons/fi";
import { LuMessageSquare } from "react-icons/lu";
import UserModal from '../../components/modal/UserModal';
import { setToggle } from '../../features/slice/toggleSlice';
import { useNavigate } from 'react-router-dom';



const Members = () => {
  const { members } = useSelector((state) => state.member)
  const {toggle} = useSelector(state => state.toggle)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleOpenMemberProfile = (id) => {
    navigate(`/members/${id}`)
    dispatch(setToggle(7))
  }

return (
<>
 <div className='font-bold mb-4 text-3xl'>Members</div>
  <div className='grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5'>
    {
     members.map((member,i) => {      
       return (
           <ul key={i} className=" bg-white text-gray-800 p-5 rounded-xl shadow-md">
               <li className='flex gap-2 items-center'>
                 <div className='w-[50px] h-[50px] border-cyan-50 border-2 rounded-[10px]'>
                   <img className='w-full h-full  rounded-[10px]' src={member.avatar} alt="" />
                 </div>
                 <div>
                   <h1 className='font-semibold text-[18px]'>{member.name}</h1>
                   <span className='text-gray-400'>{member.status}</span>
                 </div>
               </li>
               <li className='flex justify-between items-center mt-6 mb-3'>
                 <span className='text-gray-400'>Email</span>
                 <p className=''>{member.email}</p>
               </li>
                 <li className='flex justify-between items-center mb-3'>
                 <span className='text-gray-400'>Access</span>
                 <p className=''>{member.role}</p>
               </li>
               <li className='flex gap-2 items-center mb-3'>
                   {member.skills.map((skill) => <span className='bg-[#0059B6] py-[2px] px-3 text-sm rounded-[5px] text-white'>{skill}</span>)}
               </li>
               <li className='flex items-center  gap-2 mt-5'>
                  <button onClick={() => handleOpenMemberProfile(member._id)} className='border border-gray-300 hover:bg-[#00A37C] hover:text-white cursor-pointer justify-center w-1/2 flex items-center gap-2 rounded-[5px] py-1 px-5'>
                  <span><FiUser/></span>
                  Profile
                  </button>
                  <button className='bg-[#00A37C] cursor-pointer hover:bg-[#5dc3ab] text-white w-1/2 justify-center rounded-[5px] gap-2 flex items-center py-1 px-5'>
                  <span><LuMessageSquare/></span>
                  Message
                  </button>
               </li>
           </ul>

       )
     })
    }
  </div>
  {toggle === 7 && <UserModal/>}
</>
  )
}

export default Members