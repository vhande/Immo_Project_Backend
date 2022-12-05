const express = require('express')
const mongoose = require("mongoose")
const app = express()
app.use(express.json())
require('dotenv').config()
const cors = require("cors");
app.use(cors());



const product = require("./endpoints/product")
const ad = require("./endpoints/ad")
const classified = require("./endpoints/classified")
const search = require("./endpoints/search")
const register = require("./endpoints/register")
const profile = require("./endpoints/profile")
const latest = require("./endpoints/latest")
const getall = require("./endpoints/getall")
const login = require("./endpoints/login")



main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.URL, (err) => console.log('connected'))
}

// app.use('/uploads',express.static('uploads'))
app.use("/product", product)
app.use("/ad", ad)
app.use("/classified", classified)
app.use("/search", search)
app.use("/register", register)
app.use("/profile", profile)
app.use("/latest", latest)
app.use("/getall", getall)
app.use("/login", login)

app.listen(process.env.PORT || 8000, ()=> (console.log("Server is running")))
