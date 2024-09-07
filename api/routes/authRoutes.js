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
        //comparing users password with the hashed password saved in the DB.
        const passwordOK = bcrypt.compareSync(password, userDoc.password);
        if (passwordOK) {
            // logged in
            jwt.sign({ email, id: userDoc._id, username: userDoc.username }, secret, {}, (err, token) => {
                if (err) {
                    return res.status(500).json('Error signing token', err);
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
    } catch (e) {
        res.status(400).json(e.message);
    }
});


// Endpoint to verify if user is logged in:
router.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            return res.status(401).json('Invalid token', err);
        }
        res.json(info);
    });
});

module.exports = router;
