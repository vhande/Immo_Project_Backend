const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require("multer");

const product = require("./endpoints/product")
const ad = require("./endpoints/ad")
const classified = require("./endpoints/classified")
const search = require("./endpoints/search")
const register = require("./endpoints/register")
const profile = require("./endpoints/profile")
const latest = require("./endpoints/latest")
const getall = require("./endpoints/getall")

const app = express()
app.use(express.json())
require('dotenv').config()


main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.DIGITALCITY, (err) => console.log('connected'))
}

app.use("/api/product", product)
app.use("/ad", ad)
app.use("/classified", classified)
app.use("/search", search)
app.use("/register", register)
app.use("/profile", profile)
app.use("/latest", latest)
app.use("/getall", getall)

app.listen(4000, ()=> (console.log("Server is running")))
