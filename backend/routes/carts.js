const router = require('express').Router();
const User = require('../models/user');
const { authenticateToken } = require('./userAuthentication');

// put book to cart
router.put('/add-to-cart', authenticateToken, async (req, res) => {
    try
    {
       const {bookid, id} = req.headers;
       const userData = await User.findById(id);
       const isBookInCart = userData.cart.includes(bookid);
       if(isBookInCart)
       {
           return res.status(200).json({ message: "Book already added to cart" });
       }

        await User.findByIdAndUpdate(id, {$push: {cart: bookid}});
    
        return res.status(200).json({ message: "Book added to cart" });
    }
    catch (error)
    {
        res.status(500).json({ message: error.message });
    }
});

// remove book from cart
router.put('/remove-from-cart/:bookid', authenticateToken, async (req, res) => {
    try
    {
        const {bookid} = req.params;
        const {id} = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);
        if(!isBookInCart)
        {
            return res.status(200).json({ message: "Book not in cart" });
        }
        await User.findByIdAndUpdate(id, {$pull: {cart: bookid}});
        return res.status(200).json({ message: "Book removed from cart" });
    }
    catch (error)
    {
        res.status(500).json({ message: error.message });
    }
});

// get cart of a user
router.get('/get-user-cart', authenticateToken, async (req, res) => {
    try
    {
        const {id} = req.headers;
        const userData = await User.findById(id).populate('cart');
        const carts = userData.cart.reverse();

        return res.status(200).json({ carts });
    }
    catch (error)
    {
        res.status(500).json({ message: error.message });
    }   
});

module.exports = router;