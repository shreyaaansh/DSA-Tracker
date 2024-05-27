require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = 5000;
const UserLogin = require('./Routes/userRoutes')
require('./DB/Connect');
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("hello")
})
app.use(cors(
    {
        credentials: true,
        origin: ['http://localhost:3000'],
    }
));
app.use('/api/users', UserLogin);
app.listen(port, () => { console.log(`Server Running on Port ${port}`) });
