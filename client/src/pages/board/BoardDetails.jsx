import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import ListColumn from '../../components/board/ListColumn'
import { api } from '../../services/axiosIntance'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import { handleTask } from '../../features/slice/taskSlice'
import MemberModal from '../../components/modal/MemberModal'
import { setToggle } from '../../features/slice/toggleSlice'
const BoardDetails = () => {
  const { id } = useParams()
  const [boardDetails, setBoardDetails] = useState(null)
  const dispatch = useDispatch()
  const {toggle} = useSelector(state => state.toggle)

  const handleBoardDetails = async () => {
    try {
      const res = await api.get(`/api/boards/${id}`)
      setBoardDetails(res.data.board)
    } catch (error) {
      toast(error.message)
    }
  }

  useEffect(() => {
    handleBoardDetails()
    dispatch(handleTask({ boardId: id }))
  }, [id])

  return (
    <>
    <div className="flex items-center justify-between mb-6">
      <div className='text-2xl font-bold '>
        {boardDetails?.title}
      </div>
         <div className="flex items-center gap-3">
      {boardDetails?.members.map(member => (
         <img
           key={member._id}
           src={member.avatar}
           className="w-8 h-8 rounded-full"
         />
      ))}

      <button onClick={() => dispatch(setToggle(6))} className='flex cursor-pointer items-center gap-2 rounded text-[#fff] bg-[#00A37C] py-1 px-5'>
        <span>
          < FaRegUserCircle/>
        </span>
        Add Members
      </button>
      </div>

    </div>
      <div className='grid md:grid-cols-2 grid-cols-2 lg:grid-cols-4 gap-4'>
        <ListColumn />
      </div>
      {toggle === 6 && <MemberModal boardId={id}/>}
    </>
  )
}

export default BoardDetails