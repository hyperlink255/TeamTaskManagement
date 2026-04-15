import express from 'express'
import { authorize, protect } from '../middleware/verifyToken.js'
import { addMemberToBoard, getBoardMembers, getSingleMembers, removeMemberFromBoard } from '../controllers/addMemberToBoard.js'

const memberRouter = express.Router()

memberRouter.post('/:boardId/member',protect,authorize('owner'),addMemberToBoard)
memberRouter.delete('/member/:userId',protect,removeMemberFromBoard)
memberRouter.get('/member', protect,getBoardMembers)
memberRouter.get('/member/:id', protect,getSingleMembers)


export default memberRouter