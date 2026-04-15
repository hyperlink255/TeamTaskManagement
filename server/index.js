import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js'
import { connectCloudinary } from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import boardRouter from './routes/boardRoutes.js'
import listRouter from './routes/listRoutes.js'
import memberRouter from './routes/memberRoutes.js'
import dns from 'dns'
import dashboardRouter from './routes/dashboardRoutes.js'

dns.setServers(['8.8.8.8', '8.8.4.4'])

const app = express()
const PORT = process.env.PORT || 5000

// ✅ Async start function (best practice)
const startServer = async () => {
  try {
    await connectDB()
    await connectCloudinary()
    console.log("DB & Cloudinary Connected")

    // ✅ CORS FIX
    const allowedOrigins = [
      "http://localhost:5173",
      "https://team-task-management-39jj.vercel.app"
    ]

    app.use(cors({
      origin: function(origin, callback){
        if(!origin || allowedOrigins.includes(origin)){
          callback(null, true)
        } else {
          callback(new Error("Not allowed by CORS"))
        }
      },
      credentials: true
    }))

    // Middleware
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/uploads', express.static('uploads'))

    // Routes
    app.use('/api/users', userRouter)
    app.use('/api/lists', listRouter)
    app.use('/api/boards', boardRouter)
    app.use('/api/members', memberRouter)
    app.use('/api/dashboards', dashboardRouter)

    // Test route
    app.get('/', (req, res) => res.send("Hello world"))

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

  } catch (error) {
    console.error("Server Error:", error.message)
  }
}

// Start app
startServer()