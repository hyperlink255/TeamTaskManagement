import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/axiosIntance";

export const getBoardData = createAsyncThunk('board/getBoardData',
    async ({search}, {rejectWithValue}) => {
        try{
          const res = await api.get(`/api/boards?search=${search}`)          
          return res.data
        }catch(error){
          return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)
export const deleteBoard = createAsyncThunk('board/deleteBoard',
    async ({_id}, {rejectWithValue}) => {
        try{
         await api.delete(`/api/boards/${_id}`)
         return _id
        }catch(error){
          return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

const boardSlice = createSlice({
    name : "board",
    initialState : {
        board : [],
        loading:false,
        search : "",
        error:null,
        owner : null

    },
    reducers : {
        setSearch : (state,action) => {
            state.search = action.payload
        },
        setOwner : (state,action) => {
            state.owner = action.payload
        },
        clearOwner : (state,action) => {
           state.owner = null
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(getBoardData.pending, (state,action) => {
            state.loading = true;
            state.error = null
        })
        .addCase(getBoardData.fulfilled, (state,action) => {
            state.loading = false;
            state.board = action.payload.board;
        })
        .addCase(getBoardData.rejected, (state,action) => {
             state.loading = false,
             state.error = action.payload
        })
        .addCase(deleteBoard.fulfilled, (state,action) => {
            state.board = state.board.filter((item) => item._id !== action.payload)
        })
    }
})
export const {setSearch,setOwner,clearOwner} = boardSlice.actions
export default boardSlice.reducer