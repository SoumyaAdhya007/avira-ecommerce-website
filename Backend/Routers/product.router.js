const express = require("express");
const { ProductModel } = require("../Models/products.model");
const { authenticate } = require("../Middelwares/admin.authentication.middelwres");
// const { query } = require("express");
const {AdminAuth, UserAuth}=require("../Middelwares/auth.middleware")
// const app = express();
const ProductRouter = express.Router();

ProductRouter.get("/", async (req, res) => {
    try {
        const sizerange = req.query.sizerange;
        // const category = req.query.category;
        // const product_category=req.query.product
        let id = req.query.id;
       if (id != undefined) {
            let data = await ProductModel.find({ "_id": id });
            res.send(data)
        }
        else if(sizerange!=undefined){
            let data = await ProductModel.find({"size-rage":sizerange});
            res.send(data)
        }else{
              let data = await ProductModel.find({});
              res.send(data)
        }
    } catch (error) {
        res.send({ "get_msg": error })
    }
})
ProductRouter.get('/search', async (req, res) => {
    const payload = req.query;
    if (payload.title) {
        let title = payload.title.toLowerCase();
        try {
            const products = await ProductModel.find({ title: { $regex: '(?i)' + title } });
            return res.send(products)
        } catch (error) {
            return res.send({ message: error.message })
        }
    }
    try {
        const products = await ProductModel.find(payload)
        res.send(products)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})


ProductRouter.get("/price", async (req,res) => {
    try {
        const priceQ = req.query.price;
        if (priceQ <= 500) {
            const data = await ProductModel.find({ price: { $lte: 500 } })
            res.send(data)
        }
         else if (priceQ <= 1000) {
            const data = await ProductModel.find({ price: { $gte: 501, $lte: 1000 }})
            res.send(data)
        }
         else if (priceQ <= 1500) {
            const data = await ProductModel.find({ price: { $gte: 1001, $lte: 1500 }})
            res.send(data)
        }
         else if (priceQ >=2000) {
            const data = await ProductModel.find({ price: { $gte: 2000}})
            res.send(data)
        }
        else if (priceQ === "dcd") {
            const data = await ProductModel.find().sort({ price: -1 })
            res.send(data)
        }
        else if (priceQ === "acd") {
            const data = await ProductModel.find().sort({ price: 1 })
            res.send(data)
        }


    } catch (error) {
        res.send({ "msg": error })
    }
})
ProductRouter.get("/rating", async (req,res) => {
    try {
        let rating = req.query.rating;
        if (rating === "top") {
            const data = await ProductModel.find().sort({ rating: -1 })
           return res.send(data)
        } 
        else {
            const data = await ProductModel.find().sort({ rating: 1 })
            return res.send(data)
        }


    } catch (error) {
        res.send({ "msg": error })
    }
})



ProductRouter.get("/admin/:id",authenticate,AdminAuth, async (req, res) => {
    // const adminId=req.body.adminId;
    const adminId = req.params.id;
    try {
        const searchTerm = req.query.title;

        if (searchTerm !== undefined) {

            const data = await ProductModel.find({ title: { $regex: new RegExp(searchTerm, "i") } }).exec();
            res.send(data);
        } else {

            console.log(adminId)
            const data = await ProductModel.find({ adminId: adminId })
            res.send(data)
        }
    } catch (error) {
        res.send({ "admin_get_req": error })
    }
})
ProductRouter.post("/create",authenticate,AdminAuth, async (req, res) => {
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
ProductRouter.patch("/update/:id",authenticate,AdminAuth, async (req, res) => {
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
ProductRouter.delete("/delete/:id",authenticate,AdminAuth, async (req, res) => {
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
