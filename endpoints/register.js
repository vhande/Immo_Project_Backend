const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const {User} = require('../schemas/userschema')

router.post('/', (req,res)=> {
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const password = req.body.password
    
    User.find({email})
    .then( data => 
        {
            if (data.length === 0) {
                const securepassword = bcrypt.hashSync(password,10)
                const user = new User({firstname, lastname, email, password:securepassword})
                user.save()
                .then(answer=> {
                    res.json({
                        message:'saved',
                        data:answer,
                        success:"Account created"
                    })
                
                })
            }
            else {
                res.send({error:"This e-mail address already exists in our database. Please use another one."})
                console.log("User exists")
            }
        })
   
})

module.exports = router;