import Board from '../models/boardModels.js'

export const createBoard = async (req, res) => {
    try {

        if (req.user.role !== "admin" && req.user.role !== "owner") {
            return res.status(403).json({
                success: false,
                message: "Only admin and owner can create board"
            })
        }
        const { title, description } = req.body
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            })
        }

        const board = await Board.create({
            title,
            description,
            owner: req.user.id,
            members: [req.user.id],
            isArchived: false
        })

        res.status(201).json({
            success: true,
            message: "Board created successfully",
            board
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const getBoards = async (req, res) => {
    try {
        const userId = req.user.id;
        const { search } = req.query;

        const filter = {
            members: userId,
            isArchived: false
        }

        if (search) {
            filter.title = {$regex : search,$options: 'i' }
        }
        
        const board = await Board.find(filter).sort({ createdAt: -1 })
        res.status(200).json({ success: true, board })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const getBoardById = async (req, res) => {
    try {
        const board = await Board.findOne({
            _id: req.params.id,
            members: req.user.id
        }).populate("members", "name email avatar")

        if (!board) {
            return res.status(404).json({
                success: false,
                message: "Board not found or access denied"
            })
        }
        res.status(200).json({ success: true, board })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const updateBoard = async (req, res) => {
    try {
        const board = await Board.findOne({
            _id: req.params.id,
            owner: req.user.id
        })

        if (!board) {
            return res.status(404).json({
                success: false,
                message: "Board not found or not authorized"
            })
        }

        board.title = req.body.title || board.title
        board.description = req.body.description || board.description

        await board.save()

        res.status(200).json({
            success: true,
            message: "Board updated successfully",
            board
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const deleteBoard = async (req, res) => {
    try {

        const board = await Board.findOne({
            _id: req.params.id,
            owner: req.user.id
        })

        if (!board) {
            return res.status(404).json({
                success: false,
                message: "Board not found or not authorized"
            })
        }

        await board.deleteOne()
        res.status(200).json({
            success: true,
            message: "Board deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
