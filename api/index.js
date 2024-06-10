const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

//mw
app.use(cors());
app.use(express.json()); //alows to extract request body as json

app.post('/register', (req, res) => {
    const {userName, password} = req.body;
    res.json({requestData: {userName, password}});
})

app.listen(PORT, console.log(`Server is running on port ${PORT}`));