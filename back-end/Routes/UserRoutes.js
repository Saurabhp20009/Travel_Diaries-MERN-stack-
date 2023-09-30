const express= require('express')
const { Signup, Login } = require('../controller/UserController')
const userRouter= express.Router()

userRouter.post("/signup",Signup)
userRouter.post("/login",Login)

module.exports={userRouter}