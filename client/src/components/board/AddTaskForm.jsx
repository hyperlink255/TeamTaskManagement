import React, { useEffect, useState } from 'react'
import { FaXmark } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { setToggle } from '../../features/slice/toggleSlice'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { api } from '../../services/axiosIntance'
import toast from 'react-hot-toast'
import { clearEditTask, handleTask, handleUpdateTask } from '../../features/slice/taskSlice'

const AddTaskForm = ({activeColumn}) => {
  
  const dispatch = useDispatch()  
  const navigate = useNavigate()
  const {id} = useParams()
  const {user} = useSelector(state => state.user)  
  const { editTask} = useSelector(state => state.list)
    


  const [taskdata,setTaskData] = useState({
    title : "",
    description : "",
    priority : "medium",
    status : activeColumn,
    dueDate: new Date().toISOString().split("T")[0],
    board : id,
    assignedTo : user?._id
  })

  useEffect(() => {
    if(editTask?._id){
       setTaskData(editTask)
    }
 }, [editTask])

  const handleChange = (e) => {
    const {name,value} = e.target;
    setTaskData((prev) => ({...prev, [name] : value}))
  }

  const handleSubmitAddTask = async (e) => {
  e.preventDefault()
  try {
    if(editTask?._id){
       await dispatch(handleUpdateTask({
          boardId:id,
          id:editTask._id,
          taskdata
       })).unwrap()
       toast.success("Update Successfully")
       dispatch(setToggle(5))

    } else {
      const res = await api.post(`/lists/${id}`,taskdata)
      if(res.status === 201){
        toast.success(res.data.message)
        dispatch(clearEditTask())   
        dispatch(setToggle(5))
        dispatch(handleTask({boardId:id}))
      }
    }
  } catch(error){
     toast.error(error.message)
  }
}
  return (
    <div className='bg-black/10 lg:p-0 p-4 w-full text-gray-800  flex items-center gap-2 
    justify-center h-screen fixed top-0 left-0 right-0 bottom-0 z-90'>
      <div className='bg-white rounded p-6 w-full md:mt-4 mt-0 border border-gray-200/50 md:w-[800px] shadow-gray-100'>
       <div className='flex items-center justify-between'>
        <h2 className='text-xl md:text-xl font-medium  cursor-pointer' 
        onClick={() => navigate(`/boards/${id}`) }>{editTask?._id ? "UPDATE TASK" : "ADD TASK"}</h2>
        <span onClick={() => dispatch(setToggle(5))} className='cursor-pointer'>
          <FaXmark />
        </span>

       </div>
        
         <form action="" className='mt-4' onSubmit={handleSubmitAddTask}>
            <div className='grid-cols-1 md:grid-cols-2 grid lg:grid-cols-2 space-x-5'>
              <div className="mt-4">
                 <label htmlFor="title" className='text-xs font-medium text-slate-600'>
                  Task Title
                 </label>
                 <input value={taskdata.title} name="title" onChange={handleChange} 
                  type="text" placeholder='Title...' className='form-input' />
              </div>
                <div className="mt-4">
                 <label htmlFor="title" className='text-xs font-medium text-slate-600'>
                  Priority
                 </label>
                 <select value={taskdata.priority} name="priority" onChange={handleChange}
                  className='form-input'>
                   <option value="#">Priority</option> 
                   <option value="low">Low</option>
                   <option value="high">High</option>
                   <option value="medium">Medium</option>
                 </select>
              </div>
                <div className="mt-4">
                 <label htmlFor="title" className='text-xs font-medium text-slate-600'>
                  Status
                 </label>
                 <select className='form-input' value={taskdata.status} name="status"
                  onChange={handleChange}>
                   <option value="#">Status</option>
                   <option value="todo">Todo</option>
                   <option value="inprogress">In Progress</option>
                   <option value="review">Review</option>
                   <option value="done">Done</option>

                 </select>
              </div>
                 <div className="mt-4">
                 <label htmlFor="title" className='text-xs font-medium text-slate-600'>
                  Due Date
                 </label>
                  <input name="dueDate" value={taskdata.dueDate} onChange={handleChange}
                   type="date" className='form-input'/>
              </div>
            </div>
             <div className="mt-4">
                 <label htmlFor="description" className='text-xs font-medium text-slate-600'>
                  Description
                 </label>
                  <textarea name="description" value={taskdata.description} onChange={handleChange}
                  type="text" rows={4} placeholder='Description...' className='form-input'/>
              </div>
               <div className="mt-4 flex items-center justify-end">
                <button type='submit' className='bg-indigo-500 py-2 px-5 text-white rounded 
                cursor-pointer text-center hover:bg-indigo-700 transition-all duration-300'>{editTask?._id ? "UPDATE TASK" : "ADD TASK"}</button>
              </div>
         </form>
      </div>
    </div>
  )
}

export default AddTaskForm