const express=require("express");
const {UserModel}=require("../Models/users.model")
const {authentication}=require("../Middelwares/authentication.middeleware");
const { AdminAuth, UserAuth}=require("../Middelwares/auth.middleware")
const bcrypt = require('bcrypt');
const jwt= require("jsonwebtoken")
require('dotenv').config()


const UserRouter=express.Router();
UserRouter.get("/",authentication,AdminAuth, async(req,res)=>{
    try {
        const users =  await UserModel.find();
        res.status(200).send(users)
    } catch (error) {
        res.status(404).send({msg:error.message})
    }
})
UserRouter.post("/register",async (req,res)=>{
    const {name,email,password,zipcode,phoneNo}=req.body;
    if (!name||!email || !password || !zipcode || !phoneNo) {
        return res.status(401).send({ message: 'Please provide all fields' })
    }
    try {
        const check_register= await UserModel.find({
            "$or":[
                {phoneNo},
                {email}
            ]
            
        });
        console.log(check_register)
        if(check_register.length>0){
            res.status(400).send({"msg":"You are already registered ","register":"false"})
        }else{
            bcrypt.hash(password,+process.env.saltRounds, async(err,hash_pass)=>{
                if(err){
                    console.log(err);
                    res.send({"bcrypt-msg":err})
                }else{
                    const user= new UserModel({
                        name,
                        email,
                        password:hash_pass,
                        zipcode,
                        phoneNo,
                    });
                    await user.save();
                    res.status(200).send({"msg":"Register Successfully","register":"true"})
                }
            })
        }
    } catch (error) {
        res.status(404).send({"msg":error})
    }
})
UserRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(401).send({ msg: 'Provide mobile and password to login' })
    }
    try {
        const user= await UserModel.find({email});
        const hash= user[0].password
        const userId=user[0]._id;
        if(user.length>0){
            
            bcrypt.compare(password, hash, function(err, result) {
                if(result){
                    const token = jwt.sign({ id:userId ,role:"user"}, process.env.key);
                    res.status(200).cookie('token', token);
                    res.status(200).send({"msg":"Login Succesfuly","token":token})
                }else{
                    res.status(400).send("Wrong Credentials")
                }
            });
        }else{
            res.status(400).send({"msg":"You are not registered"})
        }
    } catch (error) {
        res.status(404).send({"msg":error})
    }
})

UserRouter.get('/userdetails',authentication, async (req, res) => {
    const  token  = req.body.token;
    try {
         const userInfo= await UserModel.findOne({ _id:token.id })
 
        if (!userInfo) {
            return res.status(404).send({ message: 'User not found' })
        }
        res.status(200).send(userInfo)      

    } catch (error) {
        res.status(404).send({ message: error.message })

    }
})
UserRouter.delete("/delete",authentication, async(req,res)=>{
    let paramID=req.query.id;
    let id=req.body.token.id;
 
    let user= await UserModel.findOne({_id:paramID||id});
    if(!user){
        return res.status(404).send({ message: 'User not found' })
    }
    await UserModel.findByIdAndDelete({_id:paramID||id})
    res.status(200).send({msg:"User Deleted"})
})
module.exports={
    UserRouter
}