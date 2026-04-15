import express from 'express';
import { authorize, protect } from '../middleware/verifyToken.js';
import { createBoard, deleteBoard, getBoardById, getBoards, updateBoard } from '../controllers/boardControllers.js';
const boardRouter = express.Router();

boardRouter.post('/', protect, authorize('admin', 'owner'),createBoard)
boardRouter.get('/',protect,getBoards)
boardRouter.get('/:id',protect,getBoardById)
boardRouter.put('/:id',protect,authorize('owner'),updateBoard)
boardRouter.delete('/:id',protect,authorize('owner'),deleteBoard)

export default boardRouter