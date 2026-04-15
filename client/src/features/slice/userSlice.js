import {createSlice} from '@reduxjs/toolkit'



const userSlice = createSlice({
    name : "user",
    initialState : {
        user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
        token : localStorage.getItem('token') || null,
    },
    reducers : {
        addName : (state,action) => {
            state.user = action.payload,
            localStorage.setItem('user',JSON.stringify(action.payload))
        },
        addToken : (state,action) => {
            state.token = action.payload,
            localStorage.setItem('token',action.payload)
        },
        addLogout : (state) => {
            state.user = null,
            state.token = null,
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        }
    }
})
export const {addName,addToken,addLogout} = userSlice.actions
export default userSlice.reducer