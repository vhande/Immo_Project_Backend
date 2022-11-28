const mongoose = require('mongoose')

const classifiedSchema = mongoose.Schema({
    type:String,
    classifiedtype:String,
    city:String,
    price:Number,
    bedrooms:Number,
    description:String,
    file:String
},  {
    timestamps: {
      createdAt: 'created_at'
    }
  })

const ClassifiedRent = mongoose.model('classifiedsrent', classifiedSchema) 
const ClassifiedSale = mongoose.model('classifiedssale', classifiedSchema) 

module.exports = {ClassifiedRent,ClassifiedSale}