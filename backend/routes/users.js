const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {authenticateToken} = require('./userAuthentication');

// signup route
router.post('/sign-up', async (req, res) => {
    try
    {
        const {username,email,password,address} = req.body;
        // check username length is more that 4
        if(username.length <= 4)
        {
            return res.status(400).json({ message: "Username should be more than 4 characters" });
        }
        // check username already exists
        const existingUsername = await User.findOne({username: username});
        if(existingUsername)
        {
            return res.status(400).json({ message: "Username already exists" });
        }
        // check email already exists
        const existingEmail = await User.findOne({email: email});
        if(existingEmail)
        {
            return res.status(400).json({ message: "Email already exists" });
        }
        // check password length is more that 6
        if(password.length <= 6)
        {
            return res.status(400).json({ message: "Password should be more than 6 characters" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({username:username,email:email,password:hashedPassword,address:address});
        await newUser.save();
        return res.status(200).json({ message: "user sign-in successful" });

    }
    catch (error)
    {
        res.status(500).json({ message: error.message });
    }
});

// login route
router.post('/login', async (req, res) => {
    try
    {
        const {username,password} = req.body;
        const existingUser = await User.findOne({username: username});
        if(!existingUser)
        {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        await bcrypt.compare(password, existingUser.password,(err,data)=>{
            if(data)
            {
                const authClaims = {
                    name: existingUser.username,
                    role: existingUser.role,
                };
                const token = jwt.sign((authClaims),"process.env.AUTHENTICATION_TOKEN_SECRET",{
                    expiresIn: "30d"
                });
                res.status(200).json({ id: existingUser._id, role: existingUser.role, token: token });
            }
            else
            {
                return res.status(400).json({ message: "Invalid credentials" });
            }
        });
    }
    catch (error)
    {
        res.status(500).json({ message: error.message });
    }
});

// get user infromation
router.get("/get-user-info", authenticateToken, async (req, res) => {
    try
    {
        const {id} = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json({ data: data });
    }
    catch(error)
    {
        res.status(500).json({ message: "Internal server error" });
    }
});

// update address
router.put("/update-address", authenticateToken, async (req, res) => {
    try{
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id,{address: address});
        return res.status(200).json({ message: "Address updated successfully" });
    }
    catch(error)
    {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;