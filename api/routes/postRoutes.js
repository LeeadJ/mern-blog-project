// api/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const secret = process.env.JWT_SECRET;
const uploadMiddleware = multer({ dest: 'uploads/' });

// CREATE post:
router.post('/', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    
    //fixing the file name extension
    const parts = originalname.split('.');
    const extension = parts[parts.length -1];
    const newPath = path+'.'+extension;
    fs.renameSync(path, newPath);;

    // adding cookies to post in order to get user information (author)
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            return res.status(401).json('Invalid token', err);
        }
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        });
        res.json(postDoc);
    });
});

// UPDATE post
router.put('/', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        // fixing the file name extension
        const {originalname, path} = req.file;
        parts = originalname.split('.');
        const extension = parts[parts.length -1];
        newPath = path + '.' + extension;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            return res.status(401).json('Invalid token', err);
        }
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(403).json('You are not the author.');
        }

        await Post.updateOne({ _id: id }, {
            title,
            summary,
            content,
            cover: (newPath ? newPath : postDoc.cover),
        });

        res.json(postDoc);
    });
});

// Endpoint for fetching saved posts from the db:
router.get('/', async (req, res) => {
    const posts = await Post.find()
    .populate('author', ['username'])
    .sort({ createdAt: -1 })
    .limit(20);
    res.json(posts);
});

// Endpoint for post content:
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id)
    .populate('author', ['username']);
    res.json(postDoc);
});


// DELETE post
router.delete('/:id', async (req, res) => {
    const postID = req.params.id;
    try {
        // Check if user allowed to delete post:
        const { token } = req.cookies;
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) {
                return res.status(401).json('Invalid token', err);
            }

            // Finding the post by ID:
            const postDoc = await Post.findById(postID);
            if (!postDoc) {
                return res.status(404).json({ message: 'Post not found' });
            }

            // check if current user is the author of the post:
            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
            if (!isAuthor) {
                return res.status(403).json('You are not the author');
            }

            // Delete Post:
            await Post.findByIdAndDelete(postID);
            res.json({ message: 'Post Deleted' });
    });
    } catch (error) {
        console.error('Error deleting Post', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
