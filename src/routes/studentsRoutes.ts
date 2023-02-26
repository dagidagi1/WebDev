import express from 'express'
import MyRequest from '../common/MyRequest'
import auth from '../controllers/auth'
const router = express.Router()

import post from '../controllers/post'

router.get('/', auth.authenticateMiddleware, async (req, res) => {
    try {
        const response = await post.getAllM(MyRequest.fromRestRequest(req))
        response.sendRestResponse(res)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'message': err.message
        })
    }
})
/**
* @swagger
* /post/:
*   get:
*       summary: Get list of posts from server
*       tags: [Post]
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               description: List of posts
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Post'
*                       example:
*                           message: 'abc'
*                           sender: 'def'
*/
router.get('/:id', auth.authenticateMiddleware, async (req, res) => {
    try {
        const response = await post.getPostById(MyRequest.fromRestRequest(req))
        //console.log("Res: ",res)
        response.sendRestResponse(res)
    } catch (err) {
        //console.log("ERR: ",err)
        res.status(400).send({
            'status': 'fail',
            'message': err.message
        })
    }
})
router.put('/:id', auth.authenticateMiddleware, async(req,res) => {
    try {
        const response = await post.updatePostById(MyRequest.fromRestRequest(req))
        response.sendRestResponse(res)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'message': err.message
        })
    }
})
router.post('/', auth.authenticateMiddleware, async (req, res) => {
    try {
        const response = await post.addPostM(MyRequest.fromRestRequest(req))
        response.sendRestResponse(res)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'message': err.message
        })
    }
})
export = router