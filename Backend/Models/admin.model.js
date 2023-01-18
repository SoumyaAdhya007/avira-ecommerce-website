const mongoose=require("mongoose");

const adminSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    zipcode:Number,
    phoneNo:Number,
    gender:String
})

const AdminModel=mongoose.model("admin",adminSchema);

module.exports={
    AdminModel 
}