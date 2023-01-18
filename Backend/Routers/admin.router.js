const express=require("express");
const {AdminModel}=require("../Models/admin.model")
const bcrypt = require('bcrypt');
const jwt= require("jsonwebtoken")
require('dotenv').config()

const soltRounds=5;

const Adminrouter=express.Router();

Adminrouter.post("/register",async (req,res)=>{
    const {name,email,password,zipcode,phoneNo,gender}=req.body
    try {
        const check_register= await AdminModel.find({email});
        if(check_register.length>0){
            res.send("You are already register")
        }else{
            bcrypt.hash(password,soltRounds, async(err,hash_pass)=>{
                if(err){
                    console.log(err);
                    res.send({"bcrypt-msg":err})
                }else{
                    const admin= new AdminModel({
                        name,
                        email,
                        password:hash_pass,
                        zipcode,
                        phoneNo,
                        gender
                    });
                    await admin.save();
                    res.send("Register")
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.send({"msg":error})
    }
})
Adminrouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    try {
        const admin= await AdminModel.find({email});
        const hash= admin[0].password
        const adminId=admin[0]._id;
        if(admin.length>0){
            
            bcrypt.compare(password, hash, function(err, result) {
                // result == true
                if(result){
                    const token = jwt.sign({ adminId:adminId }, process.env.key);
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
    Adminrouter
}