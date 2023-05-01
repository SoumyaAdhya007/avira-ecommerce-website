const mongoose=require("mongoose");

const orderSchema=mongoose.Schema({
    userId: {type: String, required: true},
    adminId:{type: String, required: true},
    productId:{type:String,required:true},
    size:{type:String,required:true},
    quantity: {type: Number, required: true,default:1},
    status: {
        type: String, 
        enum: ['inprocess', 'declined', 'placed', 'delivered', 'onroad', 'cancelled'],
        default: 'inprocess'
    },
    orderedAt: {type: Date, required: true},
})
const OrderModel=mongoose.model("order",orderSchema)
module.exports={
    OrderModel 
}