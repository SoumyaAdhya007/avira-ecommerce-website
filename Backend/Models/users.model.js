const mongoose=require("mongoose");
const {cartDataSchema}=require("./cartSchema")
const {whishlistDataSchema}=require("./whishlisSchema")
const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    zipcode:{type:Number,required:true},
    phoneNo:{type:Number,required:true},
    carts:{
        type:[cartDataSchema],
        default:[]
    },
    whishlists:{
        type:[whishlistDataSchema],
        default:[]
    },
})

const UserModel=mongoose.model("user",userSchema);

module.exports={
    UserModel 
}