const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const {ClassifiedRent,ClassifiedSale} = require('../modules/classifiedschema')

router.get('/', (req,res)=> {
    ClassifiedSale.find({})
    .then(answer => {
        res.json(answer)
        console.log(answer)

    })

})

module.exports = router