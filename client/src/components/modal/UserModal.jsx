import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { api } from '../../services/axiosIntance'
import UserInformation  from '../user/UserInformation'
import { useEffect } from 'react'
import { FaXmark } from 'react-icons/fa6'
import UserProject from '../user/UserProject'
import UserSkills from '../user/UserSkills'
import { setToggle } from '../../features/slice/toggleSlice'
import { useDispatch } from 'react-redux'



const UserModal = () => {
    const [member, setMembers] = useState(null)
    const [state, satState] = useState("information")
    const { id } = useParams()
    const dispatch = useDispatch()

    const handleMembersDetails = async () => {
        try {
            const res = await api.get(`/members/member/${id}`)
            if (res.status === 200) {
                setMembers(res.data.member)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        handleMembersDetails()
    }, [id])
    console.log(member);


    return (
        <div className='bg-black/10 lg:p-0 p-4 flex items-center fixed z-50 top-0 left-0
      right-0 bottom-0 justify-center h-screen w-full'>
            <div className="w-[600px]  text-gray-800 p-5 rounded bg-white">
                <div className='flex  justify-between'>
                    <div className="flex  gap-5">
                        <div className='w-[80px] h-[80px]  rounded-[10px] border-3 border-cyan-50'>
                            <img className='w-full h-full object-cover rounded-[10px]' src={member?.avatar} alt="" />
                        </div>
                        <div className="">
                            <h1 className='text-2xl'>{member?.name}</h1>
                            <div className="flex gap-2 items-center">
                                <span className='text-gray-400'>{member?.status}</span>
                                <span className='bg-indigo-400  px-2 rounded-[5px] text-white text-sm'>{member?.role}</span>
                            </div>
                        </div>
                    </div>
                    <span className='cursor-pointer' onClick={() => dispatch(setToggle(7))}>
                        <FaXmark />
                    </span>
                </div>
                <div className='mt-6'>
                    <div className="bg-[#cedae1a0] w-full  rounded-[5px] p-1">
                        <div className='flex items-center gap-2'>
                            <button onClick={() => satState("information")} className={` ${state === "information" && 'bg-[#5faffa]'} w-1/3 rounded-[5px] py-[2px]`}>Information</button>
                            <button onClick={() => satState("project")} className={` ${state === "project" && 'bg-[#5faffa]'} w-1/3 rounded-[5px] py-[2px]`}>Project</button>
                            <button onClick={() => satState("skills")} className={` ${state === "skills" && 'bg-[#5faffa]'} w-1/3 rounded-[5px] py-[2px]`}>Skills</button>
                        </div>
                    </div>
                </div>
                {state === "information" && (
                    <>
                    <UserInformation member={member}/>
                    </>
                )}
                {
                    state === "project" && (
                        <>
                        <UserProject  member={member}/>
                       </>
                    )
                }
                                {
                    state === "skills" && (
                        <>
                        <UserSkills member={member}/>
                       </>
                    )
                }

            </div>
        </div>

    )
}

export default UserModal