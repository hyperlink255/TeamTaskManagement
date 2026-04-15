import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddTaskForm from '../../components/board/AddTaskForm'
import TaskCard from './TaskCard';
import { FaPlus } from 'react-icons/fa';
import { setToggle } from '../../features/slice/toggleSlice';

const ListColumn = () => {
  const { lists, counts } = useSelector(state => state.list)
  const [activeColumn, setActiveColumn] = useState(null)
  const {toggle} = useSelector(state => state.toggle)
  const dispatch = useDispatch()

  const todoTasks = lists.filter(list => list.status === "todo")
  const inProgressTasks = lists.filter(list => list.status === "inprogress")
  const reviewTasks = lists.filter(list => list.status === "review")
  const doneTasks = lists.filter(list => list.status === "done")
  
  return (
    <>
      <div className="bg-gray-100 rounded border text-gray-800 border-gray-300">
        <div className={`bg-[#5797df] p-2 mb-3 flex  items-center gap-2`}>
          <h2 className="font-semibold text-white">Todo</h2>
          <span className='bg-white w-[15px] h-[15px] inline-flex items-center justify-center  rounded text-xs'>{counts?.todoTask}</span>
        </div>
        <div className='p-3'>
          {todoTasks.map(task => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
        <div className='border-t border-gray-300 py-3'>
          <div onClick={() => {
            dispatch(setToggle(5)),
            setActiveColumn("todo")
          }} className="flex items-center cursor-pointer text-sm justify-center gap-2 ">
            <FaPlus size={10} />
            <span>Add Task</span>
            <FaPlus size={10} />
          </div>
        </div>
      </div>
      <div className="bg-gray-100  text-gray-800 rounded border border-gray-300">
        <div className="bg-[#f3be5a] p-2 mb-3 flex gap-2 items-center">
          <h2 className="font-semibold">In Progress</h2>
          <span className='bg-white w-[15px] h-[15px] inline-flex items-center justify-center  rounded text-xs'>{counts?.progressTask}</span>
        </div>
        <div className="p-3">
          {inProgressTasks.map(task => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
        <div className='border-t border-gray-300 py-3'>
          <div onClick={() => {
            dispatch(setToggle(5)),
            setActiveColumn("inprogress")
          }} 
          className="flex items-center cursor-pointer text-sm justify-center gap-2 ">
            <FaPlus size={10} />
            <span>Add Task</span>
            <FaPlus size={10} />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 text-gray-800  rounded border border-gray-300">
        <div className='bg-[#706fcd] p-2 mb-3 flex gap-2 items-center'>
          <h2 className="font-semibold text-white ">Review</h2>
          <span className='bg-white w-[15px] h-[15px] inline-flex items-center justify-center  rounded text-xs'>{counts?.reviewTask}</span>
        </div>
        <div className="p-3">
          {reviewTasks.map(task => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
        <div className='border-t border-gray-300 py-3'>
          <div onClick={() => {
            dispatch(setToggle(5)),
            setActiveColumn("review")
            }}
            className="flex items-center cursor-pointer text-sm justify-center gap-2 ">
            <FaPlus size={10} />
            <span>Add Task</span>
            <FaPlus size={10} />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 text-gray-800 rounded border border-gray-300">
        <div className='bg-[#84ad6e] p-2 mb-3 flex gap-2 items-center'>
          <h2 className="font-semibold text-white ">Done</h2>
          <span className='bg-white w-[15px] h-[15px] inline-flex items-center justify-center  rounded text-xs'>
            {counts?.doneTask}
          </span>
        </div>
        <div className="p-3">
          {doneTasks.map(task => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
        <div className='border-t text-gray-800 border-gray-300 py-3'>
          <div onClick={() => {
            dispatch(setToggle(5)),
            setActiveColumn('done')
            }} className="flex items-center cursor-pointer text-sm justify-center gap-2 ">
            <FaPlus size={10} />
            <span>Add Task</span>
            <FaPlus size={10} />
          </div>
        </div>
      </div>
      {toggle === 5 && <AddTaskForm activeColumn={activeColumn}/>}
    </>

  )
}

export default ListColumn