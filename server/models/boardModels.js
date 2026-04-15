import mongoose from "mongoose";
const boardSchema = new mongoose.Schema({
    title : {type:String, required:true},
    description : {type:String},
    owner : {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    members : [{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    isArchived: {
      type: Boolean,
      default: false,
    },

},{timestamps:true})


const Board = mongoose.model("Board", boardSchema)
export default Board;