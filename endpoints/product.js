const express = require("express")
const router = express.Router()


router.get("/", async (req,res)=>{
    try {
        res.json({
            status:200,
            message: "Get data has succesfully,"
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send("Server error")
    }
})

module.exports = router;