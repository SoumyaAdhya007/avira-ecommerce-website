const mongoose=require("mongoose");

const whishlistDataSchema=mongoose.Schema({
    productID:{type:String,required:true}
})
module.exports={
    whishlistDataSchema 
}