const mongoose=require("mongoose")

const bloshaema=mongoose.Schema({
    title : {type : String, default : "No Title"},
    image : String,
    description : {type : String},
    createdTime : {type : Date , default : Date.now},
    userID : {type : mongoose.Schema.Types.ObjectId,ref : "user"}
})
const Blogsmodel=mongoose.model("blog",bloshaema)

module.exports=Blogsmodel