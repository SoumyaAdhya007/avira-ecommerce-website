const mongoose=require("mongoose");

const cartDataSchema=mongoose.Schema({
    "img-1":String,
    "img-2":String,
    "img-3":String,
    "img-4":String,
    "title":String,
    "price":Number,
    "category":String,
    "rating":Number,
    "size":[],
    "stock":Boolean,
    "adminId":String,
    "userId":String
})
const cartDataModel=mongoose.model("cartData",cartDataSchema);
module.exports={
    cartDataModel 
}