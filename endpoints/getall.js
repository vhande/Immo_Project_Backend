const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const {ClassifiedRent,ClassifiedSale} = require('../schemas/classifiedschema')

router.get('/', (req,res)=> {
    ClassifiedSale.find({}).limit(10)
    .then(answer => {
        res.json(answer)
        console.log(answer)

    })

})

module.exports = router