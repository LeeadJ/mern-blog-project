const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs');

const PORT = 4000;

// // password hash:
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const secret = 'sdfljkhsdfg767dsfgkjshdfg876dsajkhfgsd98g6ysd8f';

// //mw
app.use(cors({credentials: true, origin: 'http://localhost:3000'})); 
app.use(express.json()); //extract request body as json.
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads')); // serves static files from dir.
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
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        });
    }
    else{
        res.status(400).json('wrong credintials!')
    }

});

// LOGOUT endpoint:
app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

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
});

// Endpoint to verify if user is logged in:
app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err){
            throw err;
        }
        res.json(info);
    })
});


// Endpoint for creating a new post and adding to the db:
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    
    //fixing the file name extension
    const parts = originalname.split('.');
    const extension = parts[parts.length -1];
    const newPath = path+'.'+extension;
    fs.renameSync(path, newPath);
    
    // adding cookies to post in order to get user information (author)
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if(err){
            throw err;
        }
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title, 
            summary, 
            content,
            cover: newPath,
            author: info.id,
        })
        res.json(postDoc);
    })
});

// Endpoint for fetching saved posts from the db:
app.get('/post', async (req,res) => {
    const posts = await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20);
       
    res.json(posts);
})



app.listen(PORT, console.log(`Server is running on port ${PORT}`)); 


// //SA1ZCrAag47Z3q13
// //leead123
// //mongodb+srv://leead123:SA1ZCrAag47Z3q13@cluster0.wlaow54.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0