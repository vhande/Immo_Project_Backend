const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const {ClassifiedRent,ClassifiedSale} = require('../schemas/classifiedschema')

router.get('/:classifiedtype/:type/:city', (req,res) => {

    // to check URL details
    const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
    console.log(url)


   // get params and queries
   const classifiedtype = req.params.classifiedtype
   const type = req.params.type
   const city = req.params.city
   let bedroom = req.query.minBedroomCount
   let minPrice = req.query.minPrice
   let maxPrice = req.query.maxPrice
   const page = req.query.page
   let order = req.query.orderBy
   
   // to check if the value of the city is matching with one of the cities below.
   const cities = ["brussels", "antwerp","gent","charleroi", "liege", "bruges", "namur", "leuven", "mons", "mechelen", "aalst", "hasselt"]
   let cityArray =  cities.filter(item => item === city)
   
   // if queries are empty...
   bedroom === 'null' || bedroom.length === 0 ? bedroom = "0" : ""
   minPrice == 'null' || minPrice.length === 0 ? minPrice = 1 : ""
   maxPrice == 'null' || maxPrice.length === 0 ? maxPrice = 1000000 : ""

   // modify order query
   order === "newest" || order === "null" || order.length === 0 ? order = {_id: -1} : ""
   order === "cheapest" ? order = {price:1} : ""
   order === "most_expensive" ? order = {price:-1} : ""

   async function first () {
    let arr = await    ClassifiedSale.find(
        {type:type,
        city:city,
        bedrooms: {$gte:bedroom},
        price:{$gte: minPrice, $lte:maxPrice}}).sort(order).skip( page > 1 ? ( ( page - 1 ) * 5 ) : 0 ).limit(5)
    let count = await  ClassifiedSale.find(
        {type:type,
        city:city,
        bedrooms: {$gte:bedroom},
        price:{$gte: minPrice, $lte:maxPrice}}).count()
    return [arr,count]
   }

   async function second () {
    let arr = await   ClassifiedSale.find(
        {type:type,
        bedrooms: {$gte:bedroom},
        price:{$gte: minPrice, $lte:maxPrice}
        }).sort(order).skip( page > 1 ? ( ( page - 1 ) * 5 ) : 0 ).limit(5)
    let count = await  ClassifiedSale.find(
        {type:type,
        bedrooms: {$gte:bedroom},
        price:{$gte: minPrice, $lte:maxPrice}}).count()
    return [arr,count]
   } 

   async function third () {
    let arr = await ClassifiedRent.find(
        {type:type,
        city:city,
        bedrooms: {$gte:bedroom},
        price:{$gte: minPrice, $lte:maxPrice}}).sort(order).skip( page > 1 ? ( ( page - 1 ) * 5 ) : 0 ).limit(5)
    let count = await ClassifiedRent.find(
        {type:type,
        city:city,
        bedrooms: {$gte:bedroom},
        price:{$gte: minPrice, $lte:maxPrice}}).count()
    return [arr,count]
   }

   async function fourth () {
    let arr = await ClassifiedRent.find(
        {type:type,
        bedrooms: {$gte:bedroom},
        price:{$gte: minPrice, $lte:maxPrice}
        }).sort({ _id: -1 }).skip( page > 1 ? ( ( page - 1 ) * 5 ) : 0 ).limit(5)
    let count = await ClassifiedRent.find(
        {type:type,
        bedrooms: {$gte:bedroom},
        price:{$gte: minPrice, $lte:maxPrice}}).count()
    return [arr,count] 
   }

   try {
   classifiedtype === "sale" && cityArray.length === 1 ?
       first()
       .then(answer => {
           res.json(answer)
           console.log(answer)
           console.log("first")
           console.log(minPrice, maxPrice, bedroom, "aaaa")
       })
   : classifiedtype === "sale" ?
        second()
        .then(answer => {
           res.json(answer)
           console.log(order)
           console.log("second")
       })
   : classifiedtype === "rent" && cityArray.length === 1 ?
        third()
        .then(answer => {
           res.json(answer)
           console.log(answer)
           console.log("third")
   })
   :
       fourth()
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


