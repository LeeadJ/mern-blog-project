const express = require('express');
const app = express();
const cors = require('cors'); // for corss-origin sharing
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post')
const jwt = require('jsonwebtoken'); // for user authenticaiton
const cookieParser = require('cookie-parser'); // handles cookie-based sessions (extracts info from cookies).
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs');

const PORT = 4000;

// // password hash:
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10); // salt - random hash added to password
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
    const {email, password} = req.body;
    const userDoc = await User.findOne({ email });
    if(userDoc) {
        //comparing users password with the hashed password saved in the DB.
        const passwordOK = bcrypt.compareSync(password, userDoc.password);
        if(passwordOK){
            // logged in
            jwt.sign({email, id: userDoc._id, username: userDoc.username }, secret, {}, (err, token) => {
                if(err){
                    throw err;
                }
                res.cookie('token', token).json({
                    id: userDoc._id,
                    username: userDoc.username,
                });
            });
        }
        else{
            res.status(400).json('wrong credintials!')
        }
    } else {
        res.status(400).json('Wrong Credintials.');
    }
    

});

// LOGOUT endpoint:
app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

// REGISTER endpoint
app.post('/register', async (req, res) => {    
    const {email, username, password} = req.body;
    try{ // register fails if username isn't unique. Added try catch to prevent crash
        const userDoc = await User.create({
            email,
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

// Endpoint for updating a post:
app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if(req.file){
        //fixing the file name extension
        const {originalname, path} = req.file;
        parts = originalname.split('.');
        const extension = parts[parts.length -1];
        newPath = path + '.' + extension;
        fs.renameSync(path, newPath);
    }

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if(err){
            throw err;
        }
        const {id, title, summary, content} = req.body;
        const postDoc = await Post.findById(id)
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if(!isAuthor) {
            return res.status(400).json('you are not the author')
        }

        await Post.updateOne(postDoc, {
            title,
            summary,
            content,
            cover: (newPath ? newPath : postDoc.cover),
        });

        res.json(postDoc);
    });
})


// Endpoint for fetching saved posts from the db:
app.get('/post', async (req,res) => {
    const posts = await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20);
       
    res.json(posts);
})

// Endpoint for post content:
app.get('/post/:id', async (req,res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id)
    .populate('author', ['username']);
    res.json(postDoc)
})

app.delete('/post/:id', async (req,res) => {
    const postID = req.params.id;
    try {
        // Check if user allowed to delete post:
        const { token } = req.cookies;
        jwt.verify(token, secret, {}, async (err, info) => {
            if(err) {
                throw err;
            }

            // Finding the post by ID:
            const postDoc = await Post.findById(postID);
            if(!postDoc){
                return res.status(404).json({message: 'Post not found'});
            }
            // check if current user is the author of the post:
            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
            if(!isAuthor){
                return res.status(400).json('you are not the author')
            }
            // Delete Post:
            await Post.findByIdAndDelete(postID);
            res.json({message: 'Post Deleted'});

        })
    }
    catch (error){
        console.error('Error deleting Post', error);
        res.status(500).json({ message: 'Server error' });
    }
})


app.listen(PORT, console.log(`Server is running on port ${PORT}`));  


// //SA1ZCrAag47Z3q13
// //leead123
// //mongodb+srv://leead123:SA1ZCrAag47Z3q13@cluster0.wlaow54.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0