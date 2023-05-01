const mongoose=require("mongoose");

const productsSchema=mongoose.Schema({
    "img-1":{type: String, required: true},
    "img-2":{type: String, required: true},
    "img-3":{type: String, required: true},
    "img-4":{type: String, required: true},
    "title":{type: String, required: true},
    "brand":{type: String, required: true,default:"Roadstar"},
    "price":{type: Number, required: true},
    "product-category":{type: String, required: true},
    "category":{type: String, required: true},
    "rating":{type: Number, required: true},
    "size-rage":{type: String, required: true},
    "stock":Boolean,
    "adminId":{type: String, required: true},

})
const ProductModel=mongoose.model("product",productsSchema);
module.exports={
    ProductModel 
}