const express = require("express");
const { ProductModel } = require("../Models/products.model");
const { authenticate } = require("../Middelwares/admin.authentication.middelwres");
const { query } = require("express");

const app = express();
const ProductRouter = express.Router();

ProductRouter.get("/", async (req, res) => {
    try {
        const category = req.query.category;
        const price = req.query.price;

        // price query

        if (price <= 500 && category != undefined) {
            console.log(500)
            const data = await ProductModel.find({ category: req.query.category, price: { $lte: 500 } })
            res.send(data)
        }
        else if (price <= 1000 && category != undefined) {
            console.log(1000)
            console.log(req.query.category)

            const data = await ProductModel.find({ category: req.query.category, price: { $gte: 601, $lte: 1000 } })
            res.send(data)
        }
        else if (price <= 1500 && category != undefined) {
            console.log(1000)
            console.log(req.query.category)

            const data = await ProductModel.find({ category: req.query.category, price: { $gte: 1001, $lte: 1500 } })
            res.send(data)
        }
        else if (price >= 2000 && category != undefined) {
            console.log(2000)

            const data = await ProductModel.find({ category: req.query.category, price: { $gte: 2000 } })
            res.send(data)
        }

        // price low to high query 
        else if (price === "acd" && category != undefined) {
            console.log("low to high")

            const data = await ProductModel.find({ category: category }).sort({ price: 1 })
            res.send(data)
        }
        // price Hifg to low query 

        else if (price === "dcd" && category != undefined) {
            console.log("low to high")

            const data = await ProductModel.find({ category: category }).sort({ price: -1 })
            res.send(data)
        }

        const searchTerm = req.query.title;

     if (searchTerm !== undefined && category !== undefined) {
            
                const data = await ProductModel.find({ category: category, title: { $regex: new RegExp(searchTerm, "i") } }).exec();
                res.send(data);
        }

        const rating=req.query.rating;

        if(rating!==undefined && category !== undefined){
            const data = await ProductModel.find({ category: category }).sort({ price: -1 })
            res.send(data)
        }
    }catch (error) {
        res.send({ "get_msg": error })
    }
})



ProductRouter.use(authenticate)

ProductRouter.get("/admin",async (req, res)=>{
    const adminId=req.body.adminId;
    try {
        console.log(adminId)
        const data= await ProductModel.find({adminId:adminId})
        res.send(data)
    } catch (error) {
        res.send({"admin_get_req":error})
    }
})
ProductRouter.post("/create", async (req, res) => {
    const payload = req.body;
    // const post_id=req.body.adminId;
    try {
        const product = new ProductModel(payload);
        await product.save();
        res.send(payload)

    } catch (error) {
        console.log(error)
        res.send({ "post_msg": error })

    }
})
ProductRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    const id = req.params.id;
    const data = await ProductModel.findOne({ _id: id });
    const admin_id = data.adminId;
    const admin_req_id = req.body.adminId;
    try {
        if (admin_req_id != admin_id) {
            res.send("You are not authorized")
        } else {
            await ProductModel.findByIdAndUpdate({ _id: id }, payload);
            res.send(`Product is updated of ${id}`)
        }
    } catch (error) {
        res.send({ "post_msg": error })

    }
})
ProductRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const data = await ProductModel.findOne({ _id: id });
    const admin_id = data.adminId;
    const admin_req_id = req.body.adminId;
    try {
        if (admin_req_id != admin_id) {
            res.send("You are not authorized")
        } else {
            await ProductModel.findByIdAndDelete({ _id: id });
            res.send(`Product is delete of ${id}`)
        }
    } catch (error) {
        res.send({ "post_msg": error })

    }
})

module.exports = {
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

// {
//     "img-1":"https://columbia.scene7.com/is/image/ColumbiaSportswear2/1931171_021_f?wid=768&hei=806&v=1669837969",
//     "img-2":"https://columbia.scene7.com/is/image/ColumbiaSportswear2/1931171_021_b?wid=768&hei=806&v=1669837969",
//     "img-3":"https://columbia.scene7.com/is/image/ColumbiaSportswear2/1931171_021_a1?wid=768&hei=806&v=1669837969",
//     "img-4":"https://columbia.scene7.com/is/image/ColumbiaSportswear2/1931171_021_a3?wid=768&hei=806&v=1669837969",
//     "title":"Sun",
//     "price":700,
//     "category":"Men",
//     "rating":4,
//     "size":["S","M","L","XL","XXL"],
//     "size-rage":"Tall",
//     "stock":tru
// }
