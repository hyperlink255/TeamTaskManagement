import { createSlice } from "@reduxjs/toolkit";


const toggleSlice = createSlice({
    name : 'toggle',
    initialState : {
        toggle: null
    },
    reducers : {
        setToggle : (state,action) => {
         if(state.toggle === action.payload){
            state.toggle = null
         }else{
            state.toggle = action.payload
         }
        }
    },
    
})
export const {setToggle} = toggleSlice.actions
export default toggleSlice.reducer