const dotenv = require("dotenv")
const express= require('express');
const mongoose=require('mongoose')
const app= express();
dotenv.config({path: './config.env'})
require('./db/conn')
//const User= require('./model/userSchema')
app.use(express.json())
app.use(require('./router/auth'))
const port= 5000

app.listen(5000, ()=>{
    console.log(`Server is running at ${port}`)
})
