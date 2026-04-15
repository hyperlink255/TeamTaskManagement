import React from 'react'
import TopNavbar from '../components/navbar/TopNavbar'
import Sidebar from '../components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
const DashboardLayout = ({ setTheme, theme, activeMenu }) => {
    return (
        <div className='flex  h-screen '>
            <div className="flex w-full  h-screen">
                <Sidebar activeMenu={activeMenu} />

                <div className="flex flex-1 flex-col w-full">

                    <div className="shadow-md w-full">
                        <TopNavbar setTheme={setTheme} theme={theme} />
                    </div>

                    {/* 👇 IMPORTANT */}
                    <div className="flex-1 p-4 md:p-6 overflow-y-auto pb-16 md:pb-6">
                        <Outlet />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DashboardLayout