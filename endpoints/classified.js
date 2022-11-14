const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const {ClassifiedRent,ClassifiedSale} = require('../modules/classifiedschema')


router.get('/:id', (req,res) => {
    const id = req.params.id
    ClassifiedRent.find({"_id":id})
    .then(answer=> {
        if (answer.length !== 0) {
            res.json(answer)
            console.log(answer)
        }
    })

    ClassifiedSale.find({"_id":id})
    .then(answer => {
        if (answer.length !== 0) {
            res.json(answer)
            console.log(answer)
        }      
    })

})

module.exports = router;