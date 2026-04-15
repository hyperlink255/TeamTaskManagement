import Board from '../models/boardModels.js'
import List from '../models/listModels.js'

export const createList = async (req, res) => {
    try {
        const { boardId } = req.params;
        const board = await Board.findOne({
            _id: boardId,
            members: req.user.id
        })
        if (!board) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            })
        }
        const task = await List.create({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority || 'medium',
            dueDate: req.body.dueDate,
            board: boardId,
            assignedTo: req.body.assignedTo,
            createdBy: req.user.id,
            status: req.body.status || "todo",
            isDeleted: false

        })
        res.status(201).json({ success: true,message: "Task created successfully",task })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
export const getTasksByBoard = async (req, res) => {
    try {
        const board = await Board.findOne({
            _id: req.params.boardId,
            members: req.user.id
        })
        if (!board) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            })
        }

        const todoTask = await List.countDocuments({
            board: req.params.boardId,
            status: "todo",
            isDeleted: false
        })

        const progressTask = await List.countDocuments({
            board: req.params.boardId,
            status: "inprogress",
            isDeleted: false
        })

        const reviewTask = await List.countDocuments({
            board: req.params.boardId,
            status: "review",
            isDeleted: false
        })

        const doneTask = await List.countDocuments({
            board: req.params.boardId,
            status: "done",
            isDeleted: false
        })
        const lists = await List.find({
            board: req.params.boardId,
            isDeleted: false
        }).populate("assignedTo", "name avatar")

        res.status(200).json({
            success: true,
            lists,
            counts: {
                todoTask,
                progressTask,
                reviewTask,
                doneTask
            }
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
export const updateTask = async (req, res) => {
    try {
        const task = await List.findOne({
            _id: req.params.id,
            board: req.params.boardId,
            isDeleted: false
        })

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            })
        }

        task.title = req.body.title || task.title
        task.description = req.body.description || task.description
        task.priority = req.body.priority || task.priority
        task.status = req.body.status || task.status
        task.dueDate = req.body.dueDate || task.dueDate


        await task.save()

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const deleteTask = async (req, res) => {
    try {

        const task = await List.findOne({
            _id: req.params.id,
            board: req.params.boardId,
            isDeleted: false
        })

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            })
        }

        task.isDeleted = true
        await task.save()

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
