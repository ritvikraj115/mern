const dotenv = require("dotenv")
const express= require('express');
const mongoose=require('mongoose')
const app= express();
dotenv.config({path: './config.env'})
require('./db/conn')
//const User= require('./model/userSchema')
app.use(express.json())
app.use(require('./router/auth'))
const port= process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`)
})
