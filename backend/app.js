const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
require('./config/connection');
const user = require('./routes/users');
const books = require('./routes/books');
const favorites = require('./routes/favorites');
const carts = require('./routes/carts');
const orders = require('./routes/orders');
app.use(express.json());

// routes
app.use("/api/v1", user);
app.use("/api/v1", books);
app.use("/api/v1", favorites);
app.use("/api/v1", carts);
app.use("/api/v1", orders);

// creating port`
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});