import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name : {type:String, required:true},
    email : {type:String, required:true, unique:true, lowercase:true},
    password : {type:String, required:true},
    role : {type:String, enum:["owner", "admin", "member"],default:"member"},
    avatar:{type:String},
    status : {type:String},
    skills:[{type:String}],

},{timestamps:true})


userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema)
export default User;