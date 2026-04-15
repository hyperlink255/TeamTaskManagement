import express from 'express';
import upload from '../middleware/multer.js'
import { getAllUser, login, register, updateProfile } from '../controllers/userControllers.js';
import { protect } from '../middleware/verifyToken.js';
const userRouter = express.Router()


userRouter.post('/register',upload.single('image'), register)
userRouter.post('/login', login)
userRouter.get('/all',protect,getAllUser)
userRouter.put('/update',protect,upload.single('image'),updateProfile)


export default userRouter