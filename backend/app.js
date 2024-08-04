const dotenv = require("dotenv")
const express= require('express');
const mongoose=require('mongoose')
const app= express();
const cors = require("cors");
dotenv.config({path: './config.env'})
require('./db/conn')
app.use(cors());
app.get('/ok', (req, res) => {
    res.status(200).send('ok')
  })
//const User= require('./model/userSchema')
app.use(express.json())
app.use(require('./router/auth'))
const port= 3500

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`)
})
