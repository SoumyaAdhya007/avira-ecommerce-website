require('dotenv').config()
const express=require("express");
const {ProductRouter}=require("./Routers/product.router")
const {UserRouter}=require("./Routers/user.router")
const {Adminrouter}=require("./Routers/admin.router")
const {CartRouter}=require("./Routers/cart.router")
const {connection}=require("./config/db");
const cors = require('cors')
const app=express();
app.use(cors())
app.use(express.json());
app.use("/users",UserRouter)
app.use("/admins",Adminrouter)
// app.use(authenticate)
app.use("/carts",CartRouter)
app.use("/products",ProductRouter)

app.listen(process.env.port, async ()=>{
    try {
        await connection;
        console.log("Connect to DB");
        console.log(`Server is running in ${process.env.port}`)
    } catch (error) {
        console.log({"Server":error})
    }
})
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