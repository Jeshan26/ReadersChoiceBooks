const router = require('express').Router();
const User = require('../models/user');
const { authenticateToken } = require('./userAuthentication');
const Book = require('../models/book');
const Order = require('../models/order');

// placing order
router.post('/place-order', authenticateToken, async (req, res) => {
    try{
        const {id} = req.headers;
        const {order} = req.body;

        for (const data of order)
        {
            const newOrder = new Order({user: id, book: data._id});
            const orderDataFromDB = await newOrder.save();

            await User.findByIdAndUpdate(id,{
                $push: {orders: orderDataFromDB._id}
            });

            await User.findByIdAndUpdate(id,{
                $pull: {cart: data._id}
            });

        }
        return res.status(200).json({ message: "Order placed successfully" });
        
    }
    catch (error)
    {
        res.status(500).json({ message: error.message });
    }
}); 

// get order history
router.get('/order-history', authenticateToken, async (req, res) => {
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path: 'orders',
            populate: { path: 'book' }
        });

        const ordersData = userData.orders.reverse();
        return res.status(200).json({ orders: ordersData });
    }
    catch (error)
    {
        res.status(500).json({ message: error.message });
    }
});

// get all orders for admin
router.get('/all-orders', authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers;
        // Updated to User.findById(id) as we need to get user role
        const user = await User.findById(id);
        if (user.role !== "admin") return res.status(403).json({ message: "You are not authorized to perform this action" });
        const userData = await Order.find()
        .populate({
            path:"book",
        })
        .populate({
            path:'user',
        })
        .sort({createdAt: -1});

        return res.status(200).json({ orders: userData });
    }
    catch (error)
    {
        res.status(500).json({ message: error.message });
    }
});

// update user order status by admin
router.put('/update-status/:id', authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers;
        const orderid =  req.params.id;
        const user = await User.findById(id);
        if (user.role !== "admin") return res.status(403).json({ message: "You are not authorized to perform this action" });
        await Order.findByIdAndUpdate(orderid, {status: req.body.status});
        return res.status(200).json({ message: "Order updated successfully" });
    }
    catch (error)
    {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;