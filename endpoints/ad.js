const express = require("express")
const multer = require("multer");
const router = express.Router()
const app = express()
const mongoose = require('mongoose')
const {ClassifiedRent,ClassifiedSale} = require('../schemas/classifiedschema')
var admin = require("firebase-admin");
var serviceAccount = require("../immo-firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.BUCKET
    });
    app.locals.bucket = admin.storage().bucket()
    
    

const upload=multer({storage: multer.memoryStorage()})


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, './uploads'),
//     filename: (req, file, cb) => cb(null, file.originalname)
// })

//     const uploader = multer({ 
//         storage
//      })



router.post('/',upload.single("file"), (req, res) => {
    const classifiedtype = req.body.classifiedtype
    const type = req.body.type
    const city = req.body.city
    const price = req.body.price
    const bedrooms = req.body.bedrooms
    const description = req.body.description
    const fileName = req.file.originalname

    app.locals.bucket.file(fileName).createWriteStream().end(req.file.buffer)
  
    try {
    if (classifiedtype === "rent") {
    const classifiedrent= new ClassifiedRent({classifiedtype, type, city, price, bedrooms, description, file:`https://firebasestorage.googleapis.com/v0/b/immo-d130e.appspot.com/o/${req.file.originalname}?alt=media&token=`})
    classifiedrent.save({ timestamps: { createdAt: true}})
    res.json({
        success:"Your ad has been created"
    })
} else {
    const classifiedsale= new ClassifiedSale({classifiedtype, type, city, price, bedrooms, description, file:`https://firebasestorage.googleapis.com/v0/b/immo-d130e.appspot.com/o/${req.file.originalname}?alt=media&token=`})
    classifiedsale.save({ timestamps: { createdAt: true}})
    res.json({
        success:"Your ad has been created"
    })
} } catch (err) {
    console.log(err)
}    
})

module.exports = router;