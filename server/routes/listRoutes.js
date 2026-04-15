import express from 'express';
import { authorize, protect } from '../middleware/verifyToken.js';
import { createList, deleteTask, getTasksByBoard, updateTask } from '../controllers/ListControllers.js';
const listRouter = express.Router()


listRouter.post(
  '/:boardId',
  protect,
  authorize('admin', 'owner'),
  createList
)
listRouter.get(
  '/:boardId',
  protect,
  getTasksByBoard
)

listRouter.put(
  '/:boardId/:id',
  protect,
  authorize('owner', 'admin'),
  updateTask
)

listRouter.delete(
  '/:boardId/:id',
  protect,
  authorize('owner'),
  deleteTask
)

export default listRouter