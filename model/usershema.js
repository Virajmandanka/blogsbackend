const mongoose=require("mongoose")


const shema=mongoose.Schema({
    username:String,
    email:String,
    password:String
})
const Usermodel= mongoose.model("user",shema)

module.exports=Usermodel