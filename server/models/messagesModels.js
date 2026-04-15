import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    boardId : {type:mongoose.Schema.Types.ObjectId, ref:"Board"},
    senderId : {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    message:String,
    seenBy : [{
        user : {type:mongoose.Schema.Types.ObjectId,ref:"User"},
        seenAt : Date
    }]
},{timestamps:true})
const Message = mongoose.model('Message',messageSchema)
export default Message