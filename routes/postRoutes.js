const express = require('express')
const router = express.Router()

const post = require('../controllers/post')

router.get('/', (req,res, next) =>{
    post.getAllPosts(req,res, next)
})
router.get('/:id', post.getPostById)
router.post('/', (req,res,next) =>{
    post.addPost(req,res,next)
})
module.exports = router