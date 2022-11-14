const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require("multer");

const product = require("./endpoints/product")
const ad = require("./endpoints/ad")
const classified = require("./endpoints/classified")

const app = express()
app.use(express.json())
require('dotenv').config()


main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.DIGITALCITY, (err) => console.log('connected'))
}

const userSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String
})

const User = mongoose.model('users',userSchema)

const PORT = 4000

app.use("/api/product", product)
app.use("/ad", ad)
app.use("/classified", classified)

app.listen(PORT, ()=> (console.log("Server is running")))
