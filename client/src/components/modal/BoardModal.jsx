import React, { useState } from 'react'
import { FaXmark } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { setToggle } from '../../features/slice/toggleSlice';
import toast from 'react-hot-toast'
import { api } from '../../services/axiosIntance';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteBoard, getBoardData } from '../../features/slice/boradSlice';
const BoardModal = () => {
  const dispatch = useDispatch()  
  const location = useLocation()  
  const {boardId} = location.state || {} 
  const navigate = useNavigate()

  const [boardForm,setBoradForm] = useState({
    title : "",
    description:"",
  })
  
  const handleSumbit = async (e) => {    
      e.preventDefault()
      try{
        if(boardId){
          const res = await api.put(`/boards/${boardId}`,{
            title:boardForm.title,
            description:boardForm.description
          })
          if(res.status === 200){
            toast.success(res.data.message)
            dispatch(getBoardData())
            dispatch(deleteBoard())
            dispatch(setToggle(4))

          }else{
            toast.error("Update Fail")
          }
        }else{
          const res = await api.post("/boards", {
           title:boardForm.title,
           description:boardForm.description
          })
          if(res.status === 201){
           toast.success(res.data.message)
           dispatch(setToggle(4))
             dispatch(getBoardData())
            dispatch(deleteBoard())


          }
        }
      }catch(error){
        toast.error(error.message)
      }
  }

  return (
    <div className='bg-black/10 flex lg:p-0 p-4 text-gray-800 items-center fixed z-50 top-0 left-0 right-0 bottom-0 justify-center h-screen w-full'>
        <div className="bg-white rounded p-3 w-[500px]">
            <div className="flex items-center justify-between">
              <h2 onClick={() => navigate('/boards')} className='font-semibold cursor-pointer text-[20px]'>{boardId ? "Update Board" : "Add New Board"}</h2>
              <span className='cursor-pointer' onClick={() => dispatch(setToggle(4))}>
                <FaXmark size={20}/>
              </span>
            </div>
            <form className='mt-3'>
                <div className="mb-2">
                    <input type="text" value={boardForm.title} name="title" 
                    onChange={(e) => setBoradForm((prev) => ({...prev, [e.target.name] : e.target.value}))} placeholder='Title...'
                    className='w-full rounded outline-0 border p-2 px-5 border-gray-300 '/>
                </div>
                <div className="mb-2">
                    <textarea rows={5} name="description" type="text" value={boardForm.description} placeholder='Description...'
                   onChange={(e) => setBoradForm((prev) => ({...prev, [e.target.name] : e.target.value}))} 
                    className='w-full outline-0 rounded p-2 px-5 border border-gray-300 '/>
                </div>
                <div className='flex justify-end gap-2'>
                <button onClick={() => dispatch(setToggle(4))}  className='border border-gray-300 py-[6px] px-5 
                 cursor-pointer font-semibold rounded'>Cancel</button>
                <button onClick={handleSumbit} className='bg-indigo-500  py-[6px] cursor-pointer px-5 text-white font-semibold rounded'>Add Board</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default BoardModal