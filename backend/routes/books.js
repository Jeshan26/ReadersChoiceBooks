const router = require('express').Router();
const User = require('../models/user');
const Book = require('../models/book');
const {authenticateToken} = require('./userAuthentication');

// add book by admin
router.post('/add-book', authenticateToken, async (req, res) => {
    try{
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin")
        {
            return res.status(401).json({ message: "You are not authorized to add book" });
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        }); 
        await book.save();
        res.status(200).json({ message: "Book added successfully" });
    }
    catch(error)
    {
        res.status(500).json({ message: error.message });
    }
});

// update book
router.put('/update-book', authenticateToken, async (req, res) => {
    try{
        const {bookid} = req.headers;
        await Book.findByIdAndUpdate(bookid,{
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        });
        return res.status(200).json({ message: "Book updated successfully" });
    }
    catch(error)
    {
        res.status(500).json({ message: error.message });
    }
});

// delete book
router.delete('/delete-book', authenticateToken, async (req, res) => {
    try{
        const {bookid} = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "Book deleted successfully" });
    }
    catch(error)
    {
        res.status(500).json({ message: error.message });
    }
});

// get all books
router.get('/get-all-books', async (req, res) => {
    try{
        const books = await Book.find().sort({ createdAt: -1 });
        return res.status(200).json({ books });
    }
    catch(error)
    {
        res.status(500).json({ message: error.message });
    }
});

// get recently added books
router.get('/get-recent-books', async (req, res) => {
    try{
        const books = await Book.find().sort({ createdAt: -1 }).limit(2);
        return res.status(200).json({ books });
    }
    catch(error)
    {
        res.status(500).json({ message: error.message });
    }
});

// get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({ book });
    }
    catch(error)
    {
        res.status(400).json({ message: "Book not found" });
    }
});

module.exports = router;