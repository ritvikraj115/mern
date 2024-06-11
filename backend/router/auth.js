const express = require('express')
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());
require('../db/conn')
const User = require('../model/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/authenticate')
//USING PROMISES-

// router.post('/register', (req, res) => {
//     const {name, email, phone, work, password, cpassword}= req.body;    
//     //res.json({ message: "running" })
//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error: "Pls fill the field properly"})
//     }
//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"Email already exist"})
//         }

//         const user= new User({
//             name:name,
//              email:email,
//               phone:phone,
//               work:work, 
//               password:password,
//             cpassword:cpassword

//         })
//         user.save().then(()=>{
//             res.status(201).json({message:"Successful"})
//         }).catch((err)=>res.status(500).json({error:"internal server error"}))
//     })
// })

//USING ASYNC AWAIT

router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    //res.json({ message: "running" })
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Pls fill the field properly" })
    }
    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            alert("Email already exist")
            return res.status(422).json({ error: "Email already exist" })
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "Passwords don't match" })

        }
        else {

            const user = new User({
                name: name,
                email: email,
                phone: phone,
                work: work,
                password: password,
                cpassword: cpassword

            })
            const userRegistered = await user.save()
            if (userRegistered) {
                return res.status(201).json({ success: "User reg successfully" })
            }

        }
    } catch (error) {
        console.log(error)

    }
})
router.post('https://mern-0ax4.onrender.com/login', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;
        const noUser = await User.findOne({ email: email })
        if (!noUser) {
            return res.status(422).json({ error: "User does not exist" })
        }
        else if (noUser) {
            var isMatch = await bcrypt.compare(password, noUser.password)
            if (!isMatch) {
                return res.status(401).json({ error: "Invalid credentials" })
            }
            token = await noUser.generateAuthToken();
            console.log(token)
            try {

                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                })
                return res.status(201).json({ message: "Logged in succesfully" })
            } catch (error) {
                console.log(error)

            }
        }


    } catch (error) {
        console.log(error)

    }
})

router.get('/about', authenticate, (req, res) => {
    res.send(req.rootUser)
})

router.get('/getdata', authenticate, (req, res) => {
    res.send(req.rootUser)
})

router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.json({ error: "PLz fill the contact form" })
        }


        const userContact = await User.findOne({ _id: req.userID })
        if (userContact) {
            const userMessage = await userContact.ad(name, email, phone, message);
            await userContact.save();
            res.status(201).json({ message: "success" })
        }

    } catch (error) {
        console.log(error)

    }


})
router.get('/logout',(req, res) => {
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).send({'User logout':"success"})
})




module.exports = router
