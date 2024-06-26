const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const PORT = 4000;

// // password hash:
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const secret = 'sdfljkhsdfg767dsfgkjshdfg876dsajkhfgsd98g6ysd8f';

// //mw
app.use(cors({credentials: true, origin: 'http://localhost:3000'})); 
app.use(express.json()); //alows to extract request body as json
app.use(cookieParser());

// // connect to the mongoose db:
mongoose.connect('mongodb+srv://leead123:SA1ZCrAag47Z3q13@cluster0.wlaow54.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// LOGIN endpoint:
app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username: username});
    //comparing users password with the hashed password saved in the DB.
    const passwordOK = bcrypt.compareSync(password, userDoc.password);
    if(passwordOK){
        // logged in
        jwt.sign({username, id: userDoc._id}, secret, {}, (err, token) => {
            if(err){
                throw err;
            }
            res.cookie('token', token).json('ok');
        });
    }
    else{
        res.status(400).json('wrong credintials!')
    }

})

// LOGOUT endpoint:
app.post('/logout', (req, res) => {
    res.cookie('toke', '').json('ok');
})

// REGISTER endpoint
app.post('/register', async (req, res) => {    
    const {username, password} = req.body;
    try{ 
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        })
        res.json(userDoc);
    } catch(e) {
        res.status(400).json(e);
    }
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err){
            throw err;
        }
        res.json(info);
    })
    res.json(req.cookies);
})




app.listen(PORT, console.log(`Server is running on port ${PORT}`)); 


// //SA1ZCrAag47Z3q13
// //leead123
// //mongodb+srv://leead123:SA1ZCrAag47Z3q13@cluster0.wlaow54.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0