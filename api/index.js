const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const PORT = 4000;

// password hash:
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const secret = 'sdfljkhsdfg767dsfgkjshdfg876dsajkhfgsd98g6ysd8f';

//mw
app.use(cors({credentials: true, origin: 'http://localhost:3003'})); 
app.use(express.json()); //alows to extract request body as json

// connect to the mongoose db:
mongoose.connect('mongodb+srv://leead123:SA1ZCrAag47Z3q13@cluster0.wlaow54.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// login endpoint
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

// register endpoint
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

app.listen(PORT, console.log(`Server is running on port ${PORT}`)); 


//SA1ZCrAag47Z3q13
//leead123
//mongodb+srv://leead123:SA1ZCrAag47Z3q13@cluster0.wlaow54.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0