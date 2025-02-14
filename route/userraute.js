const express=require("express")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")
const Usermodel = require("../model/usershema");

const Userroute=express.Router();

Userroute.get("/register",(req,res)=>{

    res.send("Hello User");
})

Userroute.post("/register",async(req,res)=>{

 const {username,email,password}=req.body

    const che=await Usermodel.findOne({email})

    if(che)
    {
       return res.send({me:"user alredy register"})
    }

    bcrypt.hash(password,5,async(error,hash)=>{

        console.log(hash)

       await Usermodel.create({
            username,
            email,
            password:hash
        })

       return res.send({messege:"user register successfully"})
    })

})

Userroute.post("/login",async(req,res)=>{

    const {email,password}=req.body

    const user=await Usermodel.findOne({email:email})

    console.log(user)

    if(!user)
    {
        return res.send({err:"email not register"})
    }

    const data=await bcrypt.compare(password,user.password)

    console.log(data)

    if(!data)
    {
        return res.send({error:"password is incorrect"})
    }else{

        const token = jwt.sign({userid : user._id}, "NodeJS03")
        console.log(token)
    
    return res.send({messege:"user login successefully",token : token})

    }
    

})




module.exports=Userroute