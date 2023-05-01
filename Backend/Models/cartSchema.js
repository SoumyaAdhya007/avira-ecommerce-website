const mongoose=require("mongoose");

const cartDataSchema=mongoose.Schema({
    productId:{type:mongoose.Schema.Types.ObjectId,required:true},
    adminId:{type:mongoose.Schema.Types.ObjectId,required:true},
    quantity:{type:Number,required:true},
    size:{type:String,required:true},
},
{_id:false})
module.exports={
    cartDataSchema 
}