const mongoose=require("mongoose")


const connection=async()=>{

    await mongoose.connect("mongodb+srv://viraj:ram@cluster0.ceeui.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0")
    console.log("database connect")

}
module.exports=connection