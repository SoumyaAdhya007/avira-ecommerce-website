const mongoose=require("mongoose");

const productsSchema=mongoose.Schema({
    "img-1":String,
    "img-2":String,
    "img-3":String,
    "img-4":String,
    "title":String,
    "price":Number,
    "product-category":String,
    "category":String,
    "rating":Number,
    "size":[],
    "size-rage":String,
    "stock":Boolean,
    "adminId":String
})
const ProductModel=mongoose.model("product",productsSchema);
module.exports={
    ProductModel 
}