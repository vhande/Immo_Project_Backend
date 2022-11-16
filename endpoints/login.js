const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const {User} = require('../modules/userschema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()


const jwtSecret = process.env.KEY


router.post('/', (req,res) => {
    const {email} = req.body;
    const {password} = req.body;
    try {
    User.find({email})
    .then(data => { 
        console.log(data)
        if (data.length > 0) {
            let isPassCorrect = bcrypt.compareSync(password,data[0].password)
            if(isPassCorrect) {
                jwt.sign({email}, jwtSecret,{
                    algorithm:"HS256", expiresIn:"10s"
                }, (err, token) => {
                    res.json({
                        payload: req.body,
                        token: token,
                        firstname: data[0].firstname,
                        lastname: data[0].lastname
                    })
                })
            } else {
                res.send({error:"Username or password incorrect"})
            }
        } else {
            res.send({error:"Username or password incorrect"})
            console.log("Username or password incorrect")        
        }
    })
} catch (err) {
    console.log(err)
}
})

module.exports = router;