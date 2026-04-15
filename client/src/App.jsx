import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectRoutes'
import Overview from './pages/dashboard/Overview'
import Boards from './pages/dashboard/Board'
import Members from './pages/dashboard/Members'
import Settings from './pages/dashboard/Settings'
import SignUp from './pages/auth/SignUp'
import BoardDetails from './pages/board/BoardDetails'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getBoardData } from './features/slice/boradSlice'
import DashboardLayout from './layouts/DashboardLayout'
import { getHandleMember } from './features/slice/memberSlice'
import Messages from './pages/dashboard/Messages'


const App = () => {
  const path = useLocation()
  const [theme,setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  const dispatch = useDispatch()
  const {search} = useSelector(state => state.board)
    
  useEffect(() => {
    dispatch(getHandleMember())
  },[dispatch])
  
  useEffect(() => {
     dispatch(getBoardData({search:search}))
  },[dispatch,search])

  useEffect(() => {
       document.documentElement.setAttribute('data-theme', theme)
       localStorage.setItem('theme', theme)
  },[theme])

  
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp/>} />
         <Route element={<ProtectedRoute />}> 
         
        <Route element={<DashboardLayout setTheme={setTheme} theme={theme}  activeMenu={path.pathname} />}>
          <Route path='/dashboard' element={<Overview />} />
          <Route path="/boards" element={<Boards />} />
          <Route path='/boards/:id' element={<BoardDetails />} />
           <Route path="messages" element={<Messages/>}/>
          <Route path="/members" element={<Members />} />
          <Route path="/members/:id" element={<Members/>}/>
          <Route path='/settings' element={<Settings />} />
        </Route>
       </Route>

      </Routes>
     <Toaster />
    </>
  )
}

export default App