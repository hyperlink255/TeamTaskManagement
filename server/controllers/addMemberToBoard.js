import Board from '../models/boardModels.js'
import User from '../models/userModels.js';

export const addMemberToBoard = async (req, res) => {
    try {
        const { boardId } = req.params
        const { email } = req.body

        const board = await Board.findById(boardId)
        if (!board) {
            return res.status(404).json({
                success: false,
                message: "Board not found"
            })
        }

        if (board.owner.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Only owner can add members"
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found with this email"
            })
        }

        if (board.members.includes(user._id)) {
            return res.status(400).json({
                success: false,
                message: "User already a member"
            })
        }

        board.members.push(user._id)
        await board.save()

        res.status(200).json({
            success: true,
            message: "Member added successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const removeMemberFromBoard = async (req, res) => {
    try {

        const { userId } = req.params
        const board = await Board.findByIdAndDelete(userId)
        console.log(board);
        if (!board) {
            return res.status(404).json({
                success: false,
                message: "Board not found"
            })
        }
        board.members = board.members.filter(
            member => member.toString() !== userId
        )

        await board.save()

        res.status(200).json({
            success: true,
            message: "Member removed successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const getBoardMembers = async (req, res) => {
    try {
        const board = await Board.findOne({
            members: req.user.id
        }).populate('members', "name email avatar role status skills")
        res.status(200).json({
            success: true,
            members: board.members
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getSingleMembers = async (req, res) => {
    try {
        const { id } = req.params;
        const board = await Board.findOne({
            members: req.user.id
        }).populate('members', 'name email avatar role status skills')

        if (!board) {
            return res.status(404).json({
                success: false,
                message: "Board not found"
            });
        }
        const member = board.members.find((member) =>
            member._id.toString() === id)

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Member not found in this board"
            });
        }

        res.status(200).json({
            success: true,
            member
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
