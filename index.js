const express = require('express')
const product = require("./api/product")
const app = express()


const PORT = 4000

app.use("/api/product", product)

app.listen(PORT, ()=> (console.log("Server is running")))
