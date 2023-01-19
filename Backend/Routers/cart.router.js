const express=require("express");
const {cartDataModel}=require("../Models/cart.model");
const {cartAuthenticate}=require("../Middelwares/cart.authentication.middelwres");

// const app=express();
const CartRouter=express.Router();
CartRouter.use(cartAuthenticate)

CartRouter.get("/", async(req,res)=>{
    const query=req.query;
    try {
        // if(req.query.)
        const userId=req.body.userId;
        console.log(userId)
        console.log(query)
        const product= await cartDataModel.find({userId:userId});
        // const product= await cartDataModel.find({title:{'$regex' : title, '$options' : 'i'}});
        res.send(product)
    } catch (error) {
        res.send({"get_msg":error})
    }
})

CartRouter.post("/create",async (req,res)=>{
    const payload= req.body;
    // const post_id=req.body.adminId;
    try {
        const product= new cartDataModel(payload);
        await  product.save();
        res.send(payload)
        
    } catch (error) {
        console.log(error)
        res.send({"post_msg":error})
        
    }
})
CartRouter.patch("/update/:id",async (req,res)=>{
    const payload= req.body;
    const id=req.params.id;
    const data= await cartDataModel.findOne({_id:id});
    const user_id=data.userId;
    const user_req_id=req.body.userId;
    try {
        if(user_req_id!=user_id){
            res.send("You are not authorized")
        }else{
            await cartDataModel.findByIdAndUpdate({_id:id},payload);
            res.send(`Product is updated of ${id}`)
        }
    } catch (error) {
        res.send({"post_msg":error})
        
    }
})
CartRouter.delete("/delete/:id",async (req,res)=>{
    const id=req.params.id;
    const data= await cartDataModel.findOne({_id:id});
    const user_id=data.userId;
    const user_req_id=req.body.userId;
    try {
        if(user_req_id!=user_id){
            res.send("You are not authorized")
        }else{
           await cartDataModel.findByIdAndDelete({_id:id});
            res.send(`Product is delete of ${id}`)
        }
    } catch (error) {
        res.send({"post_msg":error})
        
    }
})

module.exports={
    CartRouter
}

// {
//     "img-1":"https://columbia.scene7.com/is/image/ColumbiaSportswear2/1931171_021_f?wid=768&hei=806&v=1669837969",
//     "img-2":"https://columbia.scene7.com/is/image/ColumbiaSportswear2/1931171_021_b?wid=768&hei=806&v=1669837969",
//     "img-3":"https://columbia.scene7.com/is/image/ColumbiaSportswear2/1931171_021_a1?wid=768&hei=806&v=1669837969",
//     "img-4":"https://columbia.scene7.com/is/image/ColumbiaSportswear2/1931171_021_a3?wid=768&hei=806&v=1669837969",
//     "title":"Men's Sun Trek™ Short Sleeve Graphic T-Shirt",
//     "price":700,
//     "category":"Men",
//     "rating":4,
//     "size":["S","M","L","XL","XXL"],
//     "size-rage":"Tall",
//     "stock":true
// }