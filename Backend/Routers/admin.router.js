const express=require("express");
const {AdminModel}=require("../Models/admin.model")
const bcrypt = require('bcrypt');
const jwt= require("jsonwebtoken")
require('dotenv').config()


const Adminrouter=express.Router();

Adminrouter.post("/register",async (req,res)=>{
    const {name,email,password,zipcode,phoneNo}=req.body;
    if (!name||!email || !password || !zipcode || !phoneNo) {
        return res.status(401).send({ message: 'Please provide all fields' })
    }
    try {
        const check_register= await AdminModel.find({
            "$or":[
                {phoneNo},
                {email}
            ]
    });
        if(check_register.length>0){
            res.status(200).send({"msg":"You are already register"})
        }else{
            bcrypt.hash(password,+process.env.saltRounds, async(err,hash_pass)=>{
                if(err){
                    console.log(err);
                    res.status(400).send({"bcrypt-msg":err})
                }else{
                    const admin= new AdminModel({
                        name,
                        email,
                        password:hash_pass,
                        zipcode,
                        phoneNo,
                    });
                    await admin.save();
                    res.status(200).send({"msg":"Register Successfully","register":"true"})
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({"msg":error})
    }
})
Adminrouter.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    if (!email || !password) {
        return res.status(401).send({ msg: 'Access Denied' })
    }
    try {
        const admin= await AdminModel.find({email});
        const hash= admin[0].password;
        const adminId=admin[0]._id;
        if(admin.length>0){
            
            bcrypt.compare(password, hash, function(err, result) {
                if(result){
                    const token = jwt.sign({ id:adminId,role: 'admin' }, process.env.key);
                    res.status(200).cookie('token', token, { httpOnly: true, secure: true });
                    res.status(200).send({"msg":"Login Succesfuly","token":token,"adminId":adminId})
                }else{
                    res.status(403).send("Wrong Credentials")
                }
            });
        }else{
            res.status(400).send({"msg":"You are not registered"})
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({"msg":error})
    }
})



module.exports={
    Adminrouter
}