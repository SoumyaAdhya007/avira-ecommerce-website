const mongoose=require("mongoose");

const reviewSchema=mongoose.Schema({
    productID:{type:String,required:true},
    review:{type:String,required:true},
    rating:{type:Number,required:true},
    quantity:{type:String,required:true}
})
module.exports={
    reviewSchema 
}