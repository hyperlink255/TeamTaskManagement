import React, { useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { api } from '../../services/axiosIntance'
import { CiViewBoard } from "react-icons/ci";
import { MdOutlineTask } from "react-icons/md";
import CustomPieChart from '../../components/charts/CustomPieChart'
import CustomBarChart from '../../components/charts/CustomBarChart'
import CustomCalendar from '../../components/calendar/CustomCalendar'
import ProjectStatus from '../../components/common/ProjectStatus'
import TeamActivity from '../../components/common/TeamActivity'
import GoalsTracker from '../../components/common/GoalsTracker'



const COLORS = ["#4ADE80", "#F43F5E", "#F59E0B", "#60A5FA"]

const Overview = () => {
  const { owner} = useSelector(state => state.board)
  const { user } = useSelector(state => state.user)
  const [dashboard, setDashboard] = useState(null)
  
    
  const [statusStats, setStatusStats] = useState([])
  const [priorityStats, setPriorityStats] = useState([])


const prepareChartData = (data) => {
  const taskPriorityStats = data?.priorityStats || [];
  const taskStatusStats = data?.statusStats || [];

  const statusObj = {};
  taskStatusStats.forEach(item => {
    statusObj[item._id] = item.count;
  });

  const statusData = [
    { status: "todo", count: statusObj.todo || 0 },
    { status: "inprogress", count: statusObj.inprogress || 0 },
    { status: "review", count: statusObj.review || 0 },
    { status: "done", count: statusObj.done || 0 }
  ];

  setStatusStats(statusData);


  const priorityObj = {};
  taskPriorityStats.forEach(item => {
    priorityObj[item._id] = item.count;
  });

  const priorityData = [
    { priority: "low", count: priorityObj.low || 0 },
    { priority: "medium", count: priorityObj.medium || 0 },
    { priority: "high", count: priorityObj.high || 0 }
  ];

  setPriorityStats(priorityData);
};

  const handleDashBoardData = async () => {
    try {
      if (user.role === "admin") {
        const res = await api.get('/api/dashboards/admin')
        prepareChartData(res.data)
        
        setDashboard(res.data)

      } else if (user.role === "owner") {
        const res = await api.get(`/dashboards/owner/${owner}`)
        
        prepareChartData(res.data)
        setDashboard(res.data)

      } else if (user.role === "member") {
        const res = await api.get('/dashboards/user')
        prepareChartData(res.data)
        setDashboard(res.data)
      }
    } catch (error) {
      toast.success(error.message)
    }
  }
  


  useEffect(() => {
    handleDashBoardData()
  }, [user?.role])


  return (
    <>
      <div className='flex  flex-wrap items-center relative justify-between'>
      <div className='font-bold mb-4 text-3xl '>Dashboard Overview</div>
        <CustomCalendar />
      </div>
      <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-4 grid-cols-1 mt-5">
        {
        user.role === 'admin' && (  
         <div className='bg-white shadow text-gray-800 p-5 rounded-2xl'>
          <p className='font-semibold mb-2'>Total Boards</p>
          <div className='flex justify-between items-center'>
            <div className='text-3xl'>{dashboard?.totalBoards}</div>
            <div className='bg-[#E6F6F2] flex items-center justify-center text-2xl text-[#00A37C] w-10 h-10 rounded-[10px]'>
              <CiViewBoard />
            </div>
          </div>
        </div>)
        }

        <div className='bg-white shadow  text-gray-800 p-5 rounded-2xl'>
          <p className='font-semibold mb-2 '>Total Tasks</p>
          <div className='flex justify-between items-center'>
            <div className='text-3xl'>{dashboard?.totalTasks}</div>
            <div className='bg-[#E6F6F2] flex items-center justify-center text-2xl text-[#00A37C] w-10 h-10 rounded-[10px]'>
              <MdOutlineTask />
            </div>
          </div>
        </div>
        <div className='bg-white shadow text-gray-800 p-5 rounded-2xl'>
          <p className='font-semibold mb-2'>Pending Tasks</p>
          <div className='flex justify-between items-center'>
            <div className='text-3xl'>{dashboard?.pendingTasks}</div>
            <div className='bg-[#E6F6F2] flex items-center justify-center text-2xl text-[#00A37C] w-10 h-10 rounded-[10px]'>
              <MdOutlineTask />
            </div>
          </div>
        </div>
        <div className='bg-white shadow text-gray-800 p-5 rounded-2xl'>
          <p className='font-semibold mb-2'>Completed Tasks</p>
          <div className='flex justify-between items-center'>
            <div className='text-3xl'>{dashboard?.completedTasks}</div>
            <div className='bg-[#E6F6F2] flex items-center justify-center text-2xl text-[#00A37C] w-10 h-10 rounded-[10px]'>
              <MdOutlineTask />
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6'>
        <div>
          <div className='bg-white p-6  text-gray-800 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
            <h5 className='font-medium'>Task Status</h5>
            <CustomPieChart data={statusStats} colors={COLORS} />
          </div>
        </div>
        <div>
          <div className='bg-white text-gray-800 p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
            <h5 className='font-medium'>Task Priority</h5>
            <CustomBarChart data={priorityStats} />
          </div>
        </div>
        </div>
       <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1  gap-6 my-4 md:my-6">
          <div className='bg-white p-6  text-gray-800 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
            <h5 className='font-medium'>Project Status</h5>
            <ProjectStatus/>  
          </div>
          <div className='bg-white p-6  text-gray-800 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
            <h5 className='font-medium'>Team Activity</h5>
            <TeamActivity/>
           </div>
            <div className='bg-white p-6  text-gray-800 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
            <h5 className='font-medium'>Goals Tracker</h5>
            <GoalsTracker/>
           </div>
        </div>
        <div>

        </div>

    </>
  )
}

export default Overview