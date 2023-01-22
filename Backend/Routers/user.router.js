const express=require("express");
const {UserModel}=require("../Models/users.model")
const bcrypt = require('bcrypt');
const jwt= require("jsonwebtoken")
require('dotenv').config()

const soltRounds=5;

const UserRouter=express.Router();

UserRouter.post("/register",async (req,res)=>{
    const {name,email,password,zipcode,phoneNo,gender,DOB}=req.body
    try {
        const check_register= await UserModel.find({email});
        if(check_register.length>0){
            res.send({"msg":"You are already registered ","register":"false"})
        }else{
            bcrypt.hash(password,soltRounds, async(err,hash_pass)=>{
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
                        gender
                    });
                    await user.save();
                    res.send({"msg":"Register Successfully","register":"true"})
                    console.log(process.env.soltRounds)
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.send({"msg":error})
    }
})
UserRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    try {
        const user= await UserModel.find({email});
        const hash= user[0].password
        const userId=user[0]._id;
        if(user.length>0){
            
            bcrypt.compare(password, hash, function(err, result) {
                // result == true
                if(result){
                    const token = jwt.sign({ userId:userId }, process.env.key);
                    res.send({"msg":"Login Succesfuly","token":token})
                }else{
                    res.send("Wrong Credentials")
                }
            });
        }else{
            res.send("You are not register I")
        }
    } catch (error) {
        console.log(error)
        res.send({"msg":"Wrong Credentials"})
    }
})



module.exports={
    UserRouter
}