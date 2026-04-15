import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../services/axiosIntance'

export const handleTask = createAsyncThunk('list/handleTask',
    async ({ boardId }, { rejectWithValue }) => {
        try {
            const res = await api.get(`/lists/${boardId}`)
            return res.data
        } catch (error) {
            rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)
export const handleUpdateTask = createAsyncThunk('list/handleUpdateTask',
    async ({ boardId, id, taskdata }, { rejectWithValue }) => {
        try {
            const res = await api.put(`/lists/${boardId}/${id}`, taskdata)
            return res.data
        } catch (error) {
            rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)
export const handledeleteTask = createAsyncThunk('list/handledeleteTask',
    async ({ boardId, id }, { rejectWithValue }) => {
        try {
            await api.delete(`/lists/${boardId}/${id}`)
            return id
        } catch (error) {
            rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)
const listSlice = createSlice({
    name: "list",
    initialState: {
        lists: [],
        editTask: null,
        counts: null
    },
    reducers: {
        setEditTask: (state, action) => {
            state.editTask = action.payload
        },

        clearEditTask: (state) => {
            state.editTask = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleTask.fulfilled, (state, action) => {
                state.lists = action.payload.lists
                state.counts = action.payload.counts
            })
            .addCase(handleUpdateTask.fulfilled, (state, action) => {
                const updatedTask = action.payload.task
                const index = state.lists.findIndex((item) => item._id === updatedTask._id)
                if (index !== -1) {
                    state.lists[index] = action.payload.task
                }
            })
            .addCase(handledeleteTask.fulfilled, (state, action) => {
                state.lists = state.lists.filter((item) => item._id !== action.payload)
            })
    }
})
export const { setEditTask, clearEditTask } = listSlice.actions
export default listSlice.reducer

