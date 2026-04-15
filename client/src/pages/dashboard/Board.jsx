import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { CiSearch } from "react-icons/ci";
import { FiPlusCircle } from "react-icons/fi";
import BoardModal from '../../components/modal/BoardModal';
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../../features/slice/toggleSlice';
import BoardCard from '../../components/board/BoardCard';
import {useNavigate } from 'react-router-dom';
import { setSearch } from '../../features/slice/boradSlice';

const Board = () => {
  const {toggle} = useSelector(state => state.toggle)
  const {search} = useSelector(state => state.board)

  const dispatch = useDispatch()


  return (
    <>
      <div className='flex items-center flex-wrap  relative justify-between'>
        <div className='font-bold mb-4  md:text-3xl text-2xl'>Team Board</div>
          <form action="" onSubmit={(e) => e.preventDefault()} className='flex items-center flex-wrap gap-2'>
            <div className='relative text-gray-800'>
              <input type="text" value={search} onChange={(e) => dispatch(setSearch(e.target.value))} placeholder='Search Board..' className='rounded border outline-0 bg-white py-1 
              px-8 border-gray-300 shadow'/>
              <span  className='absolute font-semibold top-[10px] left-[10px]'>
                <CiSearch/>
              </span>
            <div>
            </div>
            </div>
              <button onClick={() => dispatch(setToggle(4))} className='flex f cursor-pointer
               items-center gap-2 rounded text-[#fff] bg-[#00A37C] py-1 px-5'>
                <span>
                  <FiPlusCircle/>
                </span>
                Add Board
              </button>
          </form> 
      </div>
     <div className='mt-4'>
      <BoardCard/>
     </div>
     {toggle === 4 && <BoardModal/>}
    </>
  )
}

export default Board