import React, { useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { api } from '../../services/axiosIntance'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { addName, addToken } from '../../features/slice/userSlice'
import userImg from '../../assets/user.png'
import { AiOutlineUser } from "react-icons/ai";
import { BsEnvelope } from "react-icons/bs";
import { BiLockAlt } from "react-icons/bi";



const SignUp = () => {
    const [state, setState] = useState("login")
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        image: null,
        status : "",
        skills : []
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (state === "register") {
                const skillsArray = formData.skills.
                split(",")
                .map(skill => skill.trim())
                
                const newFormData = new FormData();
                newFormData.append('name', formData.name)
                newFormData.append('email', formData.email)
                newFormData.append('password', formData.password)
                newFormData.append('image', formData.image);
                newFormData.append('status', formData.status)
        
                skillsArray.forEach(skill => {
                    newFormData.append('skills', skill)
                })
                
                const res = await api.post('/api/users/register', newFormData)
                if (res.status === 201) {
                    toast(res.data.message)
                    dispatch(addName(res.data.user))
                    dispatch(addToken(res.data.token))
                    setFormData({
                        name: "",
                        email: "",
                        password: "",
                        image: null
                    })
                    setState("login")

                } else {
                    toast.error(res.data.message)
                }
            } else {
                const res = await api.post('/api/users/login', {
                    email: formData.email,
                    password: formData.password
                })
                if (res.status === 200) {
                    dispatch(addName(res.data.user))
                    dispatch(addToken(res.data.token))
                    setFormData({
                        password: "",
                        email: "",
                    })
                    navigate('/dashboard')
                } else {
                 toast.error(res.data.message)
                }
            }
            }catch (error) {
                toast.error(error.message)
            }

        }
       const handleChange = (e) => {
            const { name, value,files} = e.target
            if(name === "image"){
                setFormData(prev => ({...prev, image : files[0]}))
            }else{
                setFormData(prev => ({ ...prev, [name]: value }))                
            }
        }
        return (
            <>
                <AuthLayout>
                    <form onSubmit={handleSubmit} className={`${state !== "login" ? 
                    "sm:w-[700px]" : "sm:w-[350px]"  } w-full text-center border
                     border-gray-300/60 rounded-2xl px-8 bg-white`}> 
                        <h1 className="text-gray-900 text-3xl mt-10 font-medium">{state === "login" ? "Login" : "Sign up"}</h1>
                        <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
                         {state !== "login" && (
                                   <div className='w-15 h-15 m-auto mt-2 mb-2'>
                                <label htmlFor="image">
                                <img src={formData.image ? URL.createObjectURL(formData.image) : userImg} 
                                alt="" className='w-full h-full rounded-full'/>
                                <input type="file" id="image" name="image" onChange={handleChange} className='hidden' accept='image/*' />
                                </label>
                            </div>
                         )}
                        <div className={`${state !== "login" ? 'grid grid-cols-2 gap-4 mt-5' : "mt-5"}`}>
                        {state !== "login" && (
                            <>
                            <div className="flex items-center w-full bg-white border border-gray-300/80 h-12
                             rounded-full overflow-hidden pl-6 gap-2">
                                <AiOutlineUser/>
                                <input type="text" name="name"
                                 placeholder="Name" className="border-none outline-none ring-0" 
                                 value={formData.name} onChange={handleChange} required />
                            </div>
                            </>
                        )}
                        <div className={`${state === "login" && 'mb-5'} flex items-center w-full  bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2`}>
                             <BsEnvelope/>
                            <input type="email" name="email" placeholder="Email id"
                             className="border-none outline-none ring-0" 
                             value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="flex items-center  w-full bg-white border border-gray-300/80 
                        h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <BiLockAlt/>
                         <input type="password" name="password"
                             placeholder="Password" className="border-none
                             outline-none ring-0" value={formData.password}
                             onChange={handleChange} required />
                        </div>
                        {state !== "login" && (
                            <>
                         <div className="flex items-center  w-full bg-white border border-gray-300/80 
                        h-12 rounded-full overflow-hidden pl-6 gap-2">
                         <input type="text" name="status"
                             placeholder="Status" className="border-none
                             outline-none ring-0" value={formData.status}
                             onChange={handleChange} required />
                        </div>
                         <div className="flex items-center  w-full bg-white border border-gray-300/80 
                        h-12 rounded-full overflow-hidden pl-6 gap-2">
                         <input type="text" name="skills"
                             placeholder="Skills" className="border-none
                             outline-none ring-0" value={formData.skills}
                             onChange={handleChange} required />
                        </div>
                        </>

                        )}
                        </div>
                        <div className="mt-4 text-left text-indigo-500">
                            <button className="text-sm" type="reset">Forget password?</button>
                        </div>
                        <button type="submit" className="mt-2 w-full h-11 cursor-pointer rounded-full
                         text-white bg-indigo-500 hover:opacity-90 transition-opacity">
                            {state === "login" ? "Login" : "Sign up"}
                        </button>
                        <p onClick={() => setState(prev => prev === "login" ? "register" : "login")}
                         className="text-gray-500 text-sm mt-3 mb-11">{state === "login" ? "Don't have an account?" :
                          "Already have an account?"} <a href="#" className="text-indigo-500 hover:underline">click here</a>
                        </p>
                    </form>
                </AuthLayout>
            </>
        )
    }
    export default SignUp