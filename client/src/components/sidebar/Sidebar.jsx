import React from 'react'
import { FiHome } from "react-icons/fi";
import { FaRegClipboard } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addLogout } from '../../features/slice/userSlice';
import { FiMessageSquare } from "react-icons/fi";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", roles: ["owner", "admin", "member"], icon: <FiHome /> },
  { name: "Boards", path: "/boards", roles: ["owner", "admin", "member"], icon: <FaRegClipboard /> },
  { name: "Members", path: "/members", roles: ["owner", "admin"], icon: <FaUsers /> },
  { name: "Settings", path: "/settings", roles: ["owner","admin"], icon: <FiSettings /> },
  { name: "Messages", path: "/messages", roles: ["owner","admin"], icon: <FiMessageSquare /> }
];

const Sidebar = ({ activeMenu }) => {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <>
      {/* ✅ Desktop Sidebar */}
      <div className="hidden md:block w-64 h-screen  shadow-lg">
        <div className="p-3 space-y-3 h-full relative">

          <h2 className="text-2xl font-bold mb-6">TaskFlow</h2>

          {menuItems.filter(item => item.roles.includes('admin')).map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg
              ${activeMenu?.toLowerCase() === item.path?.toLowerCase()
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-200'}`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}

          {/* User */}
          <div className="absolute bottom-0 left-0 w-full px-3 py-5 border-t">
            <div className="flex items-center gap-3">
              <img
                src="https://taskify-next-admin.vercel.app/images/users/1.jpg"
                className="w-10 h-10 rounded-lg"
                alt=""
              />
              <div className="text-sm">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-gray-500">{user?.email}</p>
              </div>
              <button onClick={() => {
                dispatch(addLogout())
                navigate('/')
              }}>
                <MdOutlineLogout />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ✅ Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t md:hidden z-50">
        <div className="flex justify-around items-center py-2">

          {menuItems.filter(item => item.roles.includes('admin')).map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className={`flex flex-col items-center text-xs
              ${activeMenu?.toLowerCase() === item.path?.toLowerCase()
                  ? 'text-blue-500'
                  : 'text-gray-600'}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}

        </div>
      </div>
    </>
  )
}

export default Sidebar