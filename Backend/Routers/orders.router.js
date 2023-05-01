const express = require('express');
const { authentication } = require('../Middelwares/authentication.middeleware');
const { OrderModel } = require('../Models/order.model');
const { UserModel } = require('../Models/users.model');

const ordersRouter = express.Router();

ordersRouter.get('/', authentication, async (req, res) => {
    const { token } = req.body;
    const userId = token.id;
    const role = token.role;
    try {
        if (role == 'admin') {
            const orders = await OrderModel.find({adminId:userId});
            return res.send(orders)
        } else {
            const orders = await OrderModel.find({ userId: userId });
            return res.send(orders)
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

ordersRouter.post('/place', authentication, async (req, res) => {
    const { token } = req.body;
    const userId = token.id;
    try {
        const user = await UserModel.findOne({ _id: userId })
        if (!user) {
            return res.status(401).send({ message: 'Access Denied' })
        }
        const orders = user.carts;
        if (orders.length == 0 || !orders) {
            return res.status(404).send({ message: 'Cart not found' })
        }
        const orderedAt = Date.now();
        orders.forEach(async (item)=>{
            try {
                const order = new OrderModel({
                    userId: userId,adminId:item.adminId,productId:item.productId,size:item.size, quantity:item.quantity, orderedAt:orderedAt
                })
                await order.save();
                await UserModel.findOneAndUpdate(
                    { _id: userId },
                    {
                      $pull: { carts: { productId:item.productId } },
                    }
                  );

            } catch (error) {
              return  res.status(501).send({ message: error.message })
            }

        })
        // user.carts = [];
        // await user.save()
        res.status(201).send({ messge: 'Order Placed Sucessfully' })

    } catch (error) {
        res.status(501).send({ message: error.message })
    }
})

ordersRouter.delete('/cancel/:id', authentication, async (req, res) => {
    const { token } = req.body;
    const { orderId } = req.params['id'];
    const userId = token.id;
    const role = token.role;
    try {
        const order = await OrderModel.findOne({ _id: orderId });
        if (role == 'admin' || order.userId == userId) {
            if (order.status == 'delivered' || order.status == 'onroad') {
                return res.status(400).send({ message: `${order.status} Order Cannot Be Cancelled` })
            }
            try {
                order.status = 'cancelled';
                await order.save();
                res.send({ message: 'Order Cancelled Sucessfully' })
            } catch (error) {
                res.status(500).send({ message: error.message })
            }
        } else {
            res.status(401).send({ message: 'Access Denied' })
        }
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

module.exports = {
    ordersRouter
}