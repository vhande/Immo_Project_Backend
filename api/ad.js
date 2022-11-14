const express = require("express")
const multer = require("multer");
const router = express.Router()
const app = express()

app.use('/uploads',express.static('uploads'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => cb(null, file.originalname)
})

    const uploader = multer({ 
        storage
     })


router.post('/ad',uploader.single("file"),async (req, res) => {
    const classifiedtype = req.body.classifiedtype
    const type = req.body.type
    const city = req.body.city
    const price = req.body.price
    const bedrooms = req.body.bedrooms
    const description = req.body.description
    try {
    if (classifiedtype === "rent") {
    const classifiedrent= new ClassifiedRent({classifiedtype, type, city, price, bedrooms, description, file:`/uploads/${req.file.filename}`})
    classifiedrent.save({ timestamps: { createdAt: true}})
    res.json({
        success:"Your ad has been created"
    })
} else {
    const classifiedsale= new ClassifiedSale({classifiedtype, type, city, price, bedrooms, description, file:`/uploads/${req.file.filename}`})
    classifiedsale.save({ timestamps: { createdAt: true}})
    res.json({
        success:"Your ad has been created"
    })
} } catch (err) {
    console.log(err)
}    
})

module.exports = router;