const router = require('express').Router();
const User = require('../models/user');
const {authenticateToken} = require('./userAuthentication');

// add books to favorites
router.put('/add-favorite-book', authenticateToken, async (req, res) => {
    try
    {
       const {bookid, id} = req.headers;
       const userData = await User.findById(id);
       const isBookFavorite = userData.favorites.includes(bookid);    
       if(isBookFavorite)
       {
           return res.status(200).json({ message: "Book already added to favorites" });
       }
    // push is use to add book to favorites array in user model
       await User.findByIdAndUpdate(id, {$push: {favorites: bookid}});
       return res.status(200).json({ message: "Book added to favorites" });
    }
    catch (error)
    {
        res.status(500).json({ message: error.message });
    }
});

// remove books from favorites
router.put('/remove-favorite-book', authenticateToken, async (req, res) => {
    try
    {
       const {bookid, id} = req.headers;
       const userData = await User.findById(id);
       const isBookFavorite = userData.favorites.includes(bookid);    
       if(isBookFavorite)
       {
           await User.findByIdAndUpdate(id, {$pull: {favorites: bookid}});
       }
    // push is use to add book to favorites array in user model
       return res.status(200).json({ message: "Book removed from favorites" });
    }
    catch (error)
    {
        res.status(500).json({ message: error.message });
    }
});

// get favorite books of a user
router.get('/get-favorite-books', authenticateToken, async (req, res) => {  
    try
    {
        const {id} = req.headers;
        const userData = await User.findById(id).populate('favorites');
        return res.status(200).json({ data: userData.favorites });
    }
    catch (error)
    {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;