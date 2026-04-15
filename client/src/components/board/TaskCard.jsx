import React from 'react'
import { BsThreeDots } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setToggle } from '../../features/slice/toggleSlice';
import { handledeleteTask } from '../../features/slice/taskSlice';
import { setEditTask } from "../../features/slice/taskSlice"

import toast from 'react-hot-toast';

const TaskCard = ({ task }) => {
  const dispatch = useDispatch()
  const {id} = useParams()
  
  const handleEditTask = () => {
    dispatch(setEditTask(task))
    dispatch(setToggle(5))
  }
  
  return (
    <>
      <div className="bg-white text-gray-800 p-3 rounded shadow mb-2">
        <div className="flex items-center justify-between">
          <p>{task.title}</p>
          <div className="menu-container">
            <span className="menu-trigger">
              <BsThreeDots />
            </span>
            <div className="menu-dropdown">
              <span className="menu-item edit" onClick={handleEditTask}>
                <FaRegEdit size={14} />
              </span>
              <span onClick={() => dispatch
                (handledeleteTask({boardId:id,id:task._id}))
                .unwrap().
                then(() => toast.success('Delete SuccessFully'))
                .catch((error) => toast.error(error.message))
                } className="menu-item delete">
                <FaTrashAlt  size={14} />
              </span>
            </div>

          </div>
        </div>
        <span className='text-xs block  text-gray-500 py-1'>{new Date(task.dueDate).toLocaleDateString("en-IN")}</span>
        <div className='flex items-center justify-between'>
          <div className={`${task.priority === "medium" && "bg-yellow-500" || task.priority === "low" &&
            'bg-red-500' || task.priority === "high" && 'bg-green-500 '} px-3 rounded text-white`}>{task.priority}</div>
          <img src={task?.assignedTo?.avatar} className='w-[40px] h-[40px] rounded-full ' alt="" />
        </div>
      </div>
    </>

  )
}

export default TaskCard