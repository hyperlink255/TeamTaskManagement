import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/axiosIntance";

export const getHandleMember = createAsyncThunk('member/getHandleMember', 
    async (_,{rejectWithValue}) => {
        try{
            const res = await api.get(`/members/member`)
            return res.data
        }catch(error){
            rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)
export const deleteHandleMember = createAsyncThunk('member/deleteHandleMember', 
    async ({userId},{rejectWithValue}) => {
        try{
             await api.delete(`/members/member/${userId}`)
            return userId
        }catch(error){
            rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)

const memberSlice = createSlice({
    name : "member",
    initialState : {
        members : [],
        error:null,
        loading:false
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getHandleMember.pending, (state,action) => {
            state.loading = true;
            state.error = null
        })
        .addCase(getHandleMember.fulfilled, (state,action) => {
            state.loading = false,
            state.members = action.payload.members
        })
        .addCase(getHandleMember.rejected, (state,action) => {
            state.loading = false,
            state.error = action.payload
        })
        .addCase(deleteHandleMember.fulfilled, (state,action) => {
            state.members = state.members.filter((item) => item._id !== action.payload)
        })

    }
})
export default memberSlice.reducer