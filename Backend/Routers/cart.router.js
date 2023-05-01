const express=require("express");
const {UserModel}=require("../Models/users.model")
const { ProductModel } = require("../Models/products.model");
const {authentication}=require("../Middelwares/authentication.middeleware");
const {AdminAuth, UserAuth}=require("../Middelwares/auth.middleware")

// const app=express();
const CartRouter=express.Router();
// CartRouter.use(cartAuthenticate)



CartRouter.get("/", authentication, UserAuth, async (req, res) => {
  const { token } = req.body;
  const userId = token.id;
  try {
    const user = await UserModel.findOne({ _id: userId });
    const cart = user.carts;
    res.send(cart);
  } catch (error) {
    return res.status(501).send({ message: error.message })
  }
});

CartRouter.get("/:id", authentication, UserAuth, async (req, res) => {
  const { token } = req.body;
  const productId = req.params["id"];
  const userId = token.id;
  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(401).send({ message: "Login to continue" });
    }
    const cart = user.cart;
    if (cart.some((index) => index.productId == productId)) {
      return res.send({ message: "Product already in cart" });
    }
    res.status(409).send({ message: "Product is not in cart" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

CartRouter.post("/add",  authentication, UserAuth, async (req, res) => {
  const { token } = req.body;
  const {productId,adminId,quantity,size} = req.body;
  const userId = token.id;
  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    return res.status(401).send({ message: "Access Denied" });
  }
  const product = await ProductModel.findOne({ _id: productId });
  const cart = user.carts;
  if (cart.some((index) => index.productId == productId)) {
    return res.status(409).send({ message: "Product already in cart" });
  } else {
    try {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            carts: {
              productId,
              adminId,
              quantity,
              size
            },
          },
        }
      );
      res.send({ message: "Product added to cart" });
    } catch (error) {
      return res.status(501).send({ message: error.message });
    }
  }
});

CartRouter.delete("/remove/:id", authentication, UserAuth,  async (req, res) => {
  const { token } = req.body;
  const productId = req.params["id"];
  const userId = token.id;
  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    return res.status(401).send({ message: "Access Denied" });
  }
  const cart = user.carts;
  if (cart.some((index) => index.productId == productId)) {
    try {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          $pull: { carts: { productId } },
        }
      );
      res.send({ message: `Product with id ${productId} removed from cart` });
    } catch (error) {
      return res.status(501).send({ message: error.message });
    }
  } else {
    return res.status(404).send({ message: "Product not found in cart" });
  }
}
);

CartRouter.patch("/increase/:id", authentication, UserAuth, async (req, res) => {
  const { token } = req.body;
  const productId = req.params["id"];
  const userId = token.id;
  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    return res.status(401).send({ message: "Access Denied" });
  }
  const product = await ProductModel.findOne({ _id: productId });
  const price = product.price;
  const cart = user.carts;
  if (cart.some((index) => index.productId == productId)) {
    cart.forEach((index) => {
      if (index.productId == productId) {
        index.quantity++;
        index.price = index.price + price - price * product.discount;
      }
    });
    await user.save();
    res.send({ message: `Qantity increased of id ${productId}` });
  } else {
    return res.status(404).send({ message: "Product not found in cart" });
  }
}
);

CartRouter.patch("/decrease/:id", authentication, UserAuth,   async (req, res) => {
  const { token } = req.body;
  const productId = req.params["id"];
  const userId = token.id;
  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    return res.status(401).send({ message: "Access Denied" });
  }
  const product = await ProductModel.findOne({ _id: productId });
  const price = product.price;
  const cart = user.carts;
  if (cart.some((index) => index.productId == productId)) {
    let flag = false;
    cart.forEach((index) => {
      if (index.productId == productId) {
        if (index.quantity == 1) {
          flag = true;
        } else {
          index.quantity--;
          index.price = index.price - price - price * product.discount;
        }
      }
    });
    if (flag) {
      return res.status(409).send({ message: "Conflict in request" });
    }
    await user.save();
    res.send({ message: `Qantity decreased of id ${productId}` });
  } else {
    return res.status(404).send({ message: "Product not found in cart" });
  }
}
);

module.exports = {
  CartRouter,
};

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