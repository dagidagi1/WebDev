import express from 'express'
import auth from '../controllers/auth'
const router = express.Router()

import post from '../controllers/post'

router.get('/', auth.authenticateMiddleware, post.getAllPosts)
router.get('/:id',auth.authenticateMiddleware, post.getPostById)
router.put('/:id',auth.authenticateMiddleware, post.putPostById)
router.post('/',auth.authenticateMiddleware, post.addPost)
export = router