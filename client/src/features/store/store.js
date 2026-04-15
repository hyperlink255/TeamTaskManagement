import {configureStore} from '@reduxjs/toolkit'
import toggleReducer from '../slice/toggleSlice'
import userReducer from '../slice/userSlice'
import boardReducer from '../slice/boradSlice'
import listRouter  from '../slice/taskSlice'
import memberRouter from '../slice/memberSlice'
export const store = configureStore({
    reducer : {
        toggle : toggleReducer,
        user   :  userReducer,
        board  : boardReducer,
        list   :  listRouter,
        member : memberRouter
    }
})