const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    zipcode:Number,
    phoneNo:Number
    // gender:String
    // DOB:String
})

const UserModel=mongoose.model("user",userSchema);

module.exports={
    UserModel 
}