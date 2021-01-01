const express = require("express");
const router = express.Router();
const authRoute = require("../module/auth/auth.route");
const userRoute = require("../module/user/user.route");


router.get('/',(req,res)=>{
    res.send("hihi")
})
router.use('/auth', authRoute)
router.use('/user', userRoute)

module.exports= router;