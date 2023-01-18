const express=require("express");
const {ProductModel}=require("../Models/products.model");
const {authenticate}=require("../Middelwares/admin.authentication.middelwres");

const app=express();
const ProductRouter=express.Router();

ProductRouter.get("/", async(req,res)=>{
    try {
        const query=req.query;
        const product= await ProductModel.find(query);
        res.send(product)
    } catch (error) {
        res.send({"get_msg":error})
    }
})

app.use(authenticate)
ProductRouter.post("/create",async (req,res)=>{
    const payload= req.body;
    // const post_id=req.body.adminId;
    try {
        const product= new ProductModel(payload);
        await  product.save();
        res.send(payload)
        
    } catch (error) {
        console.log(error)
        res.send({"post_msg":error})
        
    }
})
ProductRouter.patch("/update/:id",async (req,res)=>{
    const payload= req.body;
    const id=req.params.id;
    const data= await ProductModel.findOne({_id:id});
    const admin_id=data.adminId;
    const admin_req_id=req.body.adminId;
    try {
        if(admin_req_id!=admin_id){
            res.send("You are not authorized")
        }else{
            await ProductModel.findByIdAndUpdate({_id:id},payload);
            res.send(`Product is updated of ${id}`)
        }
    } catch (error) {
        res.send({"post_msg":error})
        
    }
})
ProductRouter.delete("/delete/:id",async (req,res)=>{
    const id=req.params.id;
    const data= await ProductModel.findOne({_id:id});
    const admin_id=data.adminId;
    const admin_req_id=req.body.adminId;
    try {
        if(admin_req_id!=admin_id){
            res.send("You are not authorized")
        }else{
           await ProductModel.findByIdAndDelete({_id:id});
            res.send(`Product is delete of ${id}`)
        }
    } catch (error) {
        res.send({"post_msg":error})
        
    }
})

module.exports={
    ProductRouter
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