import express from 'express'
const router = express.Router()

import post from '../controllers/post'

router.get('/', (req,res) =>{
    post.getAllPosts(req,res)
})
router.get('/:id', post.getPostById)
router.put('/:id', post.putPostById)
router.post('/', (req,res) =>{
    post.addPost(req,res)
})
export = router