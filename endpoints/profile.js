const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken');
require('dotenv').config()

const jwtSecret = process.env.KEY


router.post('/', (req,res,next) => {
    const {token} = req.body
    try{
    jwt.verify(token, jwtSecret, (err,decoded)=> {
        if(decoded !== undefined) {
            res.json({
                success:"Access"
            })
            next()
        } else {
            //forbidden
            res.send({error:"Session has expired"})
        }
        
    })

} catch (err) {
    console.log(err)
}
})

module.exports = router;