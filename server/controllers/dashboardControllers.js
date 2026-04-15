import mongoose from "mongoose";
import Board from "../models/boardModels.js";
import Task from "../models/listModels.js";
export const getUserDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalTasks = await Task.countDocuments({ assignedTo: userId });
    const completedTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "done",
    });

    const pendingTasks = await Task.countDocuments({
      assignedTo: userId,
      status: { $ne: "done" },
    });

    const totalBoards = await Board.countDocuments({
      members: userId,
    });
    const statusStats = await Task.aggregate([
      { $match: { assignedTo: userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const priorityStats = await Task.aggregate([
      { $match: { assignedTo: userId } },
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    res.json({
      totalBoards,
      totalTasks,
      completedTasks,
      pendingTasks,
      statusStats,
      priorityStats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getAdminDashboardStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const totalBoards = await Board.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: "done",
    });

    const pendingTasks = await Task.countDocuments({
      status: { $ne: "done" },
    });

    const statusStats = await Task.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const priorityStats = await Task.aggregate([
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    res.json({
      totalBoards,
      totalTasks,
      completedTasks,
      pendingTasks,
      statusStats,
      priorityStats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getOwnerBoardDashboard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const totalTasks = await Task.countDocuments({ board: boardId });
    const completedTasks = await Task.countDocuments({
      board: boardId,
      status: "done",
    });

    const pendingTasks = await Task.countDocuments({
      board: boardId,
      status: { $ne: "done" },
    });

    const statusStats = await Task.aggregate([
      { $match: { board: new mongoose.Types.ObjectId(boardId) } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const priorityStats = await Task.aggregate([
      { $match: { board: new mongoose.Types.ObjectId(boardId) } },
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      statusStats,
      priorityStats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
