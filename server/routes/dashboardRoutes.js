import express from 'express'
import { authorize, protect } from '../middleware/verifyToken.js'
import { getAdminDashboardStats,
     getOwnerBoardDashboard,
      getUserDashboardStats
     } from '../controllers/dashboardControllers.js'

const dashboardRouter = express.Router()

dashboardRouter.get('/user',protect,getUserDashboardStats)
dashboardRouter.get('/admin',protect,authorize('admin'),getAdminDashboardStats)
dashboardRouter.get('/owner/:boardId',protect,authorize('owner'),getOwnerBoardDashboard)

export default dashboardRouter