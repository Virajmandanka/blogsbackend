const express=require("express");
const connection = require("./server");
const Userroute = require("./route/userraute");
const cors = require('cors');
const UserBlogss = require("./route/userblogs");


const app=express();

app.use(express.json())
app.use(cors())

app.use("/user",Userroute)
app.use("/blog",UserBlogss)


app.listen(8080,()=>{
    connection()
    console.log("server is running on port 8080")
})