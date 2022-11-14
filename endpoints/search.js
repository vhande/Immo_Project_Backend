const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const {ClassifiedRent,ClassifiedSale} = require('../modules/classifiedschema')

router.get('/:classifiedtype/:type/:city', (req,res) => {

    // to check URL details
    const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
    console.log(url)
  
   const classifiedtype = req.params.classifiedtype
   const type = req.params.type
   const city = req.params.city
   let bedroom = req.query.minBedroomCount
   let minPrice = req.query.minPrice
   let maxPrice = req.query.maxPrice
   
   // to check if the value of the city is matching with one of the cities below.

   const cities = ["brussels", "antwerp","gent","charleroi", "liège", "bruges", "namur", "leuven", "mons", "mechelen", "aalst", "hasselt"]
   let cityArray =  cities.filter(item => item === city)
   console.log(cityArray, city, "aaaaaaa", cityArray.length) 

   bedroom === 'null' || bedroom.length === 0 ? bedroom = "0" : ""
   minPrice == 'null' || minPrice.length === 0 ? minPrice = 1 : ""
   maxPrice == 'null' || maxPrice.length === 0 ? maxPrice = 1000000 : ""

   try {
   classifiedtype === "sale" && cityArray.length === 1 ?
       ClassifiedSale.find(
           {type:type,
           city:city,
           bedrooms: {$gte:bedroom},
           price:{$gte: minPrice, $lte:maxPrice}})
       .then(answer => {
           res.json(answer)
           console.log(answer)
           console.log("first")
           console.log(minPrice, maxPrice, bedroom, "aaaa")
       })

   : classifiedtype === "sale" ?
     ClassifiedSale.find(
           {
           type:type})
           .then(answer => {
           res.json(answer)
           console.log(answer)
           console.log("second")
       })
   : classifiedtype === "rent" && cityArray.length === 1 ?
       ClassifiedRent.find(
       {
       type:type,
       bedrooms: {$gte:bedroom},
       price:{$gte: minPrice, $lte:maxPrice}})
       .then(answer => {
       res.json(answer)
       console.log(answer)
       console.log("third")
   })
   :
   ClassifiedRent.find(
       {
       type:type})
       .then(answer => {
       res.json(answer)
       console.log(answer)
       console.log("fourth")
   })
} catch (err) {
    console.log(err)
}
})

module.exports = router;


