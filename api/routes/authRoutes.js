const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken'); // for user authenticaiton
const bcrypt = require('bcryptjs');
const secret = process.env.JWT_SECRET;
const saltRounds = parseInt(process.env.SALT_ROUNDS);
 

// LOGIN endpoint:
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        console.log(userDoc)
        //verifying password using bcrypt.
        const passwordOK = bcrypt.compareSync(password, userDoc.password);
        if (passwordOK) {
            // logged in
            jwt.sign({ email, id: userDoc._id, username: userDoc.username }, secret, {}, (err, token) => {
                if (err) {
                    console.error('Error signing token:', err);
                    return res.status(500).json({ message: 'Error signing token' }); 
                }
                // save in the cookies for reuse
                res.cookie('token', token).json({
                    id: userDoc._id,
                    username: userDoc.username,
                });
            });
        } else {
            res.status(400).json('Wrong credentials!');
        }
    } else {
        res.status(400).json('Wrong credentials.');
    }
});


// LOGOUT endpoint:
router.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});


// REGISTER endpoint
router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    // register fails if email isn't unique. Added try catch to prevent crash
    try {
        const userDoc = await User.create({
            email,
            username,
            password: bcrypt.hashSync(password, saltRounds),
        });
        res.json(userDoc);
    } catch (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ message: 'Error registering user' }); 
    }
});


// Endpoint to verify if user is logged in:
router.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            console.error('Error verifying user token:', err);
            return res.status(401).json({ message: 'Error verifying user token' }); 
        }
        res.json(info);
    });
});

module.exports = router;
