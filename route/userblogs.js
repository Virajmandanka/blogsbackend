const express=require("express")
const jwt=require("jsonwebtoken")
const Blogsmodel = require("../model/blogsshema")
const auth = require("../midelware/auth")

const UserBlogss=express.Router()


UserBlogss.get("/",auth,async(req,res)=>{
    let Blogs = await Blogsmodel.find().populate('userID','username email')
   res.send({blogs : Blogs})
})

UserBlogss.post("/add",auth,async(req,res)=>{
    let {title,image,description,userId} = req.body
    console.log(userId)
    let obj = {
        title ,
        image ,
        description,
        userID : userId
    }
    let data = await Blogsmodel.create(obj)
    res.status(200).send({msg : "Blog added Succesfully", blog : data})
})
UserBlogss.get("/singal/:id",auth,async(req,res)=>{
    try {
        let data = await Blogsmodel.findById(req.params.id)
        res.status(200).json(data)
    } catch (error) {
        res.status(401).json(error)
    }
})
// UserBlogss.get("/user/:id", auth, async (req, res) => {
//     try {
//         const user = await Blogsmodel.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// });


UserBlogss.get("/getmine", auth, async (req, res) => {
    
    try {

        let blogs = await Blogsmodel.find({ userID: req.body.userId }).populate('userID', 'username email');
        console.log(blogs);
        
        res.send({ blogs : blogs});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to retrieve blogs' });
    }
});


UserBlogss.delete("/delete/:id", auth, async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.body.userId;

      

        await Blogsmodel.findByIdAndDelete(blogId);
        res.status(200).send({ msg: "Blog deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to delete blog" });
    }
});


UserBlogss.get("/blog/:id", async (req, res) => {
    const { id } = req.params;
    console.log(`Fetching blog with ID: ${id}`);  
    try {
        const blogData = await Blogsmodel.findById(id);
        if (!blogData) {
            console.log('Blog not found');
            return res.status(404).json({ error: "Blog not found" });
        }
        console.log('Blog found:', blogData);
        res.status(200).json({ blog: blogData });
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ error: "Failed to fetch the blog" });
    }
});


UserBlogss.put("/edit/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBlog = await Blogsmodel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.status(200).json({ msg: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ error: "Failed to update the blog" });
    }
});








module.exports=UserBlogss