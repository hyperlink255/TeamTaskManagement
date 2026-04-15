import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../common/Loader'
import { useNavigate } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { setToggle } from '../../features/slice/toggleSlice';
import { deleteBoard, setOwner } from '../../features/slice/boradSlice';
import toast from 'react-hot-toast';

const BoardCard = () => {
    const { board, loading,owner} = useSelector(state => state.board)
    
    

    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    
    const handleClick = (id) => {
        navigate("/boards", { state: { boardId: id } })
        dispatch(setToggle(4))
    }

    const handleOwnerDashboard = (id) => {
        dispatch(setOwner(id))
        navigate('/dashboard')
    }

    return (
        <div>
            {loading ? <Loader /> : (
                <div className='grid md:grid-cols-2 text-gray-800 sm:grid-cols-1 gap-4 lg:grid-cols-3 '>
                    {
                        board.map((item, i) => {
                            return (
                                <div  className='bg-white text-gray-800 cursor-pointer p-2 rounded'>
                                    <div onClick={() => navigate(`/boards/${item._id}`)}>
                                        <h4 className='text-[18px] font-semibold'>{item.title}</h4>
                                        <p>{item.description.substring(0, 50)}</p>
                                    </div>
                                    <div className='flex text-gray-800 items-center justify-end gap-2 space-y-1'>
                                        <span onClick={() => handleClick(item._id)} 
                                        className='bg-[#E6F6F2] w-[40px] h-[40px] text-[#00A37C] rounded-full justify-center flex items-center'>
                                            <FaEdit size={20} />
                                        </span>
                                        <span onClick={() => {
                                            dispatch(deleteBoard({_id:item._id}))
                                                .unwrap()
                                                .then((res) => {
                                                    toast.success("Board Deleted Successfully")
                                                })
                                                .catch((error) => {
                                                    toast.error(error)
                                                })
                                        }}
                                            className='bg-[#FEE9EA] w-[40px] h-[40px] text-red-500 rounded-full justify-center flex items-center'>
                                            <FaRegTrashAlt />
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )}
        </div>
    )
}

export default BoardCard