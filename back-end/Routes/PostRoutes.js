const express= require('express')
const { addPost, getAllPosts, editPost, deletePost } = require('../controller/PostsController')
const { verifyToken } = require('../Middleware/VerifyToken')
const postRouter= express.Router()

postRouter.post("/addpost/:_id",verifyToken,addPost)
postRouter.get("/getallposts",verifyToken,getAllPosts)
postRouter.put("/editpost/:_id",verifyToken,editPost)
postRouter.delete("/deletepost/:_id",verifyToken,deletePost)

module.exports={postRouter}
