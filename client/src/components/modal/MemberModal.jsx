import React from 'react'
import { setToggle } from '../../features/slice/toggleSlice'
import { FaXmark } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../../services/axiosIntance'
import toast from 'react-hot-toast'
import { useState } from 'react'

const MemberModal = ({ boardId }) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")

    const handleAddMember = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post(`/api/members/${boardId}/member`, {
                email: email
            })
            if (res.status === 200) {
                toast.success(res.data.message)
                dispatch(setToggle(6))
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }
    return (
        <div className='bg-black/10 lg:p-0 p-4 flex items-center fixed z-50 top-0 left-0 right-0 bottom-0 justify-center h-screen w-full'>
            <div className="bg-white rounded w-[350px]">
                <div className="flex items-center justify-between p-2 border-b border-gray-300 ">
                    <h2 className='font-semibold text-center  w-full  text-[20px]'>
                        Add Member to Board
                    </h2>
                    <span className='cursor-pointer' onClick={() => dispatch(setToggle(6))}>
                        <FaXmark size={20} />
                    </span>
                </div>
                <form onClick={handleAddMember}  className='mt-3 p-3'>
                    <div className="mb-2">
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter Your Email...'
                            className='w-full rounded outline-0 border p-2 px-5 border-gray-300 ' />
                    </div>
                    <div className='flex items-center justify-center'>
                        <button type="submit" className='bg-indigo-500  py-[6px] cursor-pointer px-5 text-white font-semibold rounded'>Add Member</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default MemberModal