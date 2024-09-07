const express = require('express');
const app = express();
const cors = require('cors'); // for corss-origin sharing
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); // handles cookie-based sessions (extracts info from cookies).

require('dotenv').config();

const PORT = process.env.PORT || 4000;

// //mw
app.use(cors({origin: '*', credentials: true })); // for sending credentials between domains
app.use(express.json()); //extract request body as json.
app.use(cookieParser()); 
app.use('/uploads', express.static(__dirname + '/uploads')); // serves static files from dir.


// // connect to the mongoose db:
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);


// Import routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

// Use routes
app.use('/auth', authRoutes);
app.use('/post', postRoutes);

// Server test
app.get('/', (req, res) => {
  res.status(200).json("Welcome to the server!");
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));  